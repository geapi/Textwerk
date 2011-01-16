/**
 * User: geapi
 * Date: Jan 15, 2011
 * Time: 6:24:48 PM
 */

// ==========================================================================
// Project:   Textwerk.Corpus
// Copyright: �2011 usebar
// ==========================================================================
/*globals CoreTextwerk, Textwerk */

/** @class

        (Document Your Data Source Here)

 @extends SC.DataSource
 */
CoreTextwerk.Corpus = SC.DataSource.extend(
    /** @scope CoreTextwerk.Corpus.prototype */
{

    // ..........................................................
    // QUERY SUPPORT
    //
    fetch: function(store, query) {
        var recordType = query.get('recordType');
        var url = "/documents";
        if (recordType == 'CoreTextwerk.Collection') {
            console.log("getting collection(s) remotely");
            url = url + "?coll=true";
            //if (query.get('isLocal')) return NO;
            //SC.Logger.log("remote query");
            SC.Request.getUrl(url).header({
                'Accept': 'application/json'
            }).json().notify(this, '_didFetch', {
                query: query,
                store: store
            }).send();

            return YES;
        }
        if (recordType == 'CoreTextwerk.Paper') {
            console.log("getting papers(s) remotely");
            //if (query.get('isLocal')) return NO;
            //SC.Logger.log("remote query");
            SC.Request.getUrl(url).header({
                'Accept': 'application/json'
            }).json().notify(this, '_didFetch', {
                query: query,
                store: store
            }).send();

            return YES;
        }

        // TODO: Add handlers to fetch data for specific queries.
        // call store.dataSourceDidFetchQuery(query) when done.
        return NO; // return YES if you handled the query
    },
    _didFetch: function(request, params) {
        //console.log("did fetch  " + request);
        var store = params.store;
        var query = params.query;
        var response = request.get('response');
        var recordType = query.get('recordType');
        if (SC.ok(response)) {
            var results = request.get('body');
            //console.log("got body");
            if (results.content) {
                //console.log("got content");
                if (recordType == 'CoreTextwerk.Collection') {
                    //console.log("Collection(s): " + SC.inspect(results.content));
                    store.loadRecords(CoreTextwerk.Collection, results.content);
                    console.log("loaded " + results.content.length + " collection(s)");
                    store.dataSourceDidFetchQuery(query);
                }
                if (recordType == 'CoreTextwerk.Paper') {
                    //console.log("got status: " + results.status);
                    var status = results.status;
                    if (status == "undefined" || status == "ok" || status == "connected") {
                        console.log("got " + results.content.length + " papers(s)");
                        store.loadRecords(CoreTextwerk.Paper, results.content);
                        console.log("loaded " + results.content.length + " paper(s)");
                        store.dataSourceDidFetchQuery(query);
                    } else if (status == "error") {
                        console.log("Error: " + results.content);
                        store.dataSourceDidErrorQuery(query, response);
                    }

                }
            }
        }
        else {
            console.log("error getting data for " + recordType + " from server with: " + request.get('body').content);
            store.dataSourceDidErrorQuery(query, response);
        }
    },

    // ..........................................................
    // RECORD SUPPORT
    //
    retrieveRecord: function(store, storeKey) {
        var url = "/documents";
        var recordType = store.recordTypeFor(storeKey), id = store.idFor(storeKey);
        SC.Logger.log("retrieve called for: " + recordType);
        var id = store.idFor(storeKey);
        var params = {
            store: store,
            storeKey: storeKey
        };
        console.log("getting papers(s) remotely: "+ store.idFor(storeKey));
        //if (query.get('isLocal')) return NO;
        //SC.Logger.log("remote query");
        //SC.Request.getUrl(url+"?id="+id).header({
        //    'Accept': 'application/json'
        //}).json().notify(this, '_didRetrievePaper', params).send();

        return YES;
    },

    _didRetrievePaper: function(request, params) {
        var store = params.store,
                storeKey = params.storeKey,
                response = request.get('response')
        results = request.get('body');

        CoreTextwerk.set('ds', results.content);

        if (SC.$ok(response)) {
            //store.loadRecords(CoreTextwerk.Paper, results.content);
            console.log("content: " + results.content);
            store.dataSourceDidComplete(storeKey, response);
            //store.flush();
            return YES;
        } else {
            store.dataSourceDidError(storeKey, response);
            return NO;
        }
    },


    createRecord: function(store, storeKey) {

        // TODO: Add handlers to submit new records to the data source.
        // call store.dataSourceDidComplete(storeKey) when done.
        return YES; // return YES if you handled the storeKey
    },

    updateRecord: function(store, storeKey) {

        // TODO: Add handlers to submit modified record to the data source
        store.dataSourceDidComplete(storeKey);
        return YES; // return YES if you handled the storeKey
    },

    destroyRecord: function(store, storeKey) {

        // TODO: Add handlers to destroy records on the data source.
        // call store.dataSourceDidDestroy(storeKey) when done
        return NO; // return YES if you handled the storeKey
    }

});

