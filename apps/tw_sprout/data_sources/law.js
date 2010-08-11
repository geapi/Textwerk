// ==========================================================================
// Project:   TwSprout.PubmedDataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
sc_require('models/law');
TwSprout.LAW_RESULTS_QUERY = SC.Query.remote(TwSprout.Law, {
  orderBy: 'guid,title'
});

TwSprout.LawDataSource = SC.DataSource.extend(
/** @scope TwSprout.PubmedDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query, terms) {
	
     if (query === TwSprout.LAW_RESULTS_QUERY) {
		console.log('got a query');
		var recordType = query.get('recordType'); 
		var url = recordType.prototype.pubmedurl;
		//alert("search term is: "+TwSprout.lawController.get('searchTermLaw'));
	    SC.Request.getUrl(url+'?term='+TwSprout.lawController.get('searchTermLaw')+"&resultsPerPage="+TwSprout.lawController.get('resultsPerPage')+"&page="+TwSprout.lawController.get('currentPage')).header({'Accept': 'application/json'}).json()
	      .notify(this, 'didFetchResults', store, query)
	      .send();
	    return YES;
	  }

	  return NO;
  	},

	didFetchResults: function(response, store, query) {
		TwSprout.lawController.set('searching', NO);
		  if (SC.ok(response)) {
			//alert("trying to give out results "+ response.get('body').content + " who's the store: "+store+ "record type: "+query.get('recordType'))
		     var storeKeys = store.loadRecords(query.get('recordType'), response.get('body').content);
		     if(response.get('body').content.length === 0){
				TwSprout.lawController.set('noResults', YES);
			 }

		store.loadQueryResults(query, storeKeys);
		//store.dataSourceDidFetchQuery(query);
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