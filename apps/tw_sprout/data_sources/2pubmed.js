// ==========================================================================
// Project:   TwSprout.Pubmed
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
sc_require('models/pubmed');
TwSprout.RESULTS_QUERY = SC.Query.local(TwSprout.Pubmed, {
  orderBy: 'guid,title'
});

TwSprout.Pubmed2 = SC.DataSource.extend(
/** @scope TwSprout.Pubmed.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query, terms) {

     if (query === TwSprout.RESULTS_QUERY) {
		alert('got a query');
	    SC.Request.getUrl('/searchPubmed?term=ovarian+cancer').header({'Accept': 'application/json'}).json()
	      .notify(this, 'didFetchResults', store, query)
	      .send();
	    return YES;
	  }

	  return NO;
  	},

	didFetchResults: function(response, store, query) {
	  if (SC.ok(response)) {
	    store.loadRecords(TwSprout.Pubmed, response.get('body').content);
	    store.dataSourceDidFetchQuery(query);
	
	  } else store.dataSourceDidErrorQuery(query, response);
	},

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
  if (SC.kindOf(store.recordTypeFor(storeKey), TwSprout.Pubmed)) {

    var url = store.idFor(storeKey);
    SC.Request.getUrl(url).header({
                'Accept': 'application/json'
            }).json()
      .notify(this, 'didRetrieveResults', store, storeKey)
      .send();
    return YES;

  	} else return NO;
  },

  didRetrieveResults: function(response, store, storeKey) {
    if (SC.ok(response)) {
      var dataHash = response.get('body').content;
      store.dataSourceDidComplete(storeKey, dataHash);
  
    } else store.dataSourceDidError(storeKey, response);
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;
