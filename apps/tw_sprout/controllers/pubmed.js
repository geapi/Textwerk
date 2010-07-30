// ==========================================================================
// Project:   TwSprout.pubmedController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
TwSprout.pubmedController = SC.ArrayController.create(
/** @scope TwSprout.pubmedController.prototype */ {
	searching: NO,
	noResults: NO,
	totalsCount: "",
	currentPage: 1,
	page: 1,
	resultsPerPage: 20,
	
	
	setNumberOfResults: function(response){
		if (SC.ok(response)) {;
	      this.set('totalsCount', "current page: "+this.currentPage +" total results: "+ response.get('body').resultCount);
		  console.log(response.get('body').resultCount);
	    }
	},

  	resultcount: function() {
	    var len = this.get('length'), ret ;

	    if (len && len > 0) {
		if(this.currentPage == 1){
		  SC.Request.getUrl('getResultsCount?term='+this.get('searchTerm')).json()
		            .notify(this, 'setNumberOfResults')
		            .send(); 
		 }
	      ret = len === 1 ? "1 result"  : "%@ results".fmt(len);
	      ret = ret + " for search term: "+TwSprout.pubmedController.get('searchTerm');
	    } else ret = "No results";

	    return ret ;
	  }.property('length').cacheable(),
	
	hightlight: function(){
		var content = this.get('content');
		var authors = content.get('authors');
	},
	resultsDidChange: function(){ 
		//var content = this.get('content');
		//results = TwSprout.store.find(TwSprout.Pubmed);
		//console.log("new content -> %@,".fmt(results.getEach('pmid')));
	}.observes('content'),  
	
	isSelected: function(){
	   console.log('just got selected');   
	}.observes('selected'),
	
   arrangedObjects: function(){
	   //alert(this.get('status'));
	   //console.log(this.get('content'));
   	   return this.get('content');
   }.property('status').cacheable(),

	searchPubmed: function(){
		console.log('search was triggered with: '+this.searchTerm);
		TwSprout.pubmedController.set('searching', YES);
		//TwSprout.store.reset();
		//TwSprout.pubmedController.set('content', null);
		TwSprout.store.reset();
		var results = TwSprout.store.find(TwSprout.RESULTS_QUERY);
		//console.log("results are: "+results.length);
		results.refresh(); // this refresh makes sure that I get the update RecordArray displayed in the view
		//var results = TwSprout.store.find(SC.Query.remote(TwSprout.Pubmed, {orderBy: 'guid,title'}));
		
		TwSprout.pubmedController.set('content', results);
	},
	
	newSearch: function(evt){	 
			//console.log("so far "+this.searchTerm);
	},
	
	nextPage: function(){
		console.log("want to see NEXT page");
		this.currentPage = this.currentPage+1;
		this.searchPubmed();
	},
			
	previousPage: function(){
		console.log("want to see PREVIOUS page");
		if(this.currentPage >= 1){
			this.currentPage = this.currentPage-1;
			this.searchPubmed();
		}
	},

}) ;
