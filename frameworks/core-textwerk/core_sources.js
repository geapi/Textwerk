/**
 * User: geapi
 * Date: Jan 15, 2011
 * Time: 6:24:48 PM
 */

// ==========================================================================
// Project:   CoreTextwerk.Corpus
// Copyright: ©2011 usebar
// ==========================================================================
/*globals Textwerk, CoreTextwerk */

/** @class

        (Document Your Data Source Here)

 @extends SC.DataSource
 */
CoreTextwerk.Corpus = SC.DataSource.extend(
    /** @scope CoreTextwerk.Corpus.prototype */
{

    _currentRecordID: 0,
    // ..........................................................
    // QUERY SUPPORT
    //
    fetch: function(store, query) {
        var recordType = query.get('recordType'), url = recordType.prototype.url, canRequest = YES;
        console.log("getting " + recordType +" remotely");
        if (url == SC.empty()) {
            canRequest = NO;
        }
        if (canRequest) {
            SC.Request.getUrl(url).header({
                'Accept': 'application/json'
            }).json().notify(this, '_didFetch', {
                query: query,
                store: store
            }).send();
            return YES;
        } else {
            return NO;
        }
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
                var status = results.status;
                if (status == "ok") {
                    store.loadRecords(recordType, results.content);
                    console.log("loaded " + results.content.length + " of type " + recordType);
                    store.dataSourceDidFetchQuery(query);
                } else {
                    console.log("Error: " + results.content);
                    store.dataSourceDidErrorQuery(query, response);
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
        //SC.Logger.log("retrieve called for: " + recordType);
        var id = store.idFor(storeKey);
        var params = {
            store: store,
            storeKey: storeKey
        };
        //console.log("getting papers(s) remotely: "+ store.idFor(storeKey));
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


    updateRecord: function(store, storeKey) {

        // TODO: Add handlers to submit modified record to the data source
        store.dataSourceDidComplete(storeKey);
        return YES; // return YES if you handled the storeKey
    },


    /**
     * Retrieves a single record from the store.
     *
     * @param {SC.Record} recordType The type of the record to retrieve.
     * @param {String|Number} id The ID of the record to retrieve.
     *
     * @returns {CoreOrion.Record} The instantiated record.
     */
    findRecord: function(recordType, id) {
        return this.get('store').find(recordType, id);
    },

    /**
     * Retrieves all records from the store matching the given query.
     *
     * @param {SC.Query} q The query to apply.
     *
     * @returns {SC.RecordArray} A SC.RecordArray of matching records.
     */
    findRecords: function(q) {
        return this.get('store').find(q);
    },

    /**
     * Creates a new record in the store.
     *
     * @param {CoreOrion.Record} recordType The type of the record.
     * @param {Hash} dataHash The data hash used to seed the new record (optional).
     *
     * @returns {CoreOrion.Record} A new record instance.
     */
    createRecord: function(recordType, dataHash) {
        if (!dataHash) dataHash = {};

        // Assign the new record a negative integer ID
        if (dataHash.id === undefined) {
            dataHash.id = this._currentRecordID + '';
            this._currentRecordID--;
        }

        return this.get('store').createRecord(recordType, dataHash);
    },

    destroyRecord: function(rec) {
        if (SC.none(rec) || !SC.kindOf(rec, SC.Record)) return NO;
        var sk = rec.get('storeKey');
        this.get('store').destroyRecord(null, null, sk);
        return YES;
    }

});

