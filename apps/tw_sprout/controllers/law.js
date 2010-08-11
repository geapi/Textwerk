// ==========================================================================
// Project:   TwSprout.law
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
TwSprout.lawController = SC.ObjectController.create(
/** @scope TwSprout.law.prototype */ {
		searching: NO,
		noResults: NO,
		totalsCount: "",
		currentPage: 1,
		page: 1,
		resultsPerPage: 20,
		totalPages: 20,
		startIndex: 1,
		endIndex: 20,
		maxPageNumber: 1,
		searchTermLaw :"", 
		previousSearchTerm :"",
		showLastButton: YES,
		showPreviousButton: NO,
		
		searchTermOverviewL: function(){
			console.log("sto called");
			var len = this.get('length'), ret ;
			if (len && len > 0) {
				ret = " search term " + this.get('searchTermLaw') + " yielded " + this.get('totalsCount') + " results";
				}
			return ret;

		}.property('length'),

		setNumberOfResults: function(response){
			if (SC.ok(response)) {
		      this.set('totalsCount', response.get('body').resultCount);
			  console.log(response.get('body').resultCount);
			  //this.searchTermOverview();
		    }
		},


		displayCurrentPage: function(){
			//console.log("displayCurrentPage called");
			var len = this.get('length'), ret = "no results" ;
			this.set('startIndex', (this.get('currentPage')-1)*this.get('resultsPerPage') + 1);
	    	this.set('endIndex', this.get('totalsCount') <= this.get('startIndex')+this.get('resultsPerPage') ? this.get('totalsCount') :  ((this.get('currentPage')-1)*this.get('resultsPerPage'))+this.get('resultsPerPage'));
			this.set('totalPages', Math.ceil(this.get('totalsCount')/this.get('resultsPerPage')));
			if (len && len > 0) {
				var whichResults = " showing results " + this.get('startIndex') + " to " + this.get('endIndex');
				ret = "Page "+ this.get('currentPage') + " of " + this.get('totalPages') + whichResults;
			}
			return ret;

		}.property('length'),

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
			this.enablePreviousButton();
			this.enableNextButton();
			if(this.get('previousSearchTerm') != this.get('searchTermLaw')){
				this.set('previousSearchTerm', this.get('searchTermLaw'));
				this.set('currentPage',1);
				SC.Request.getUrl('getResultsCount?term='+this.get('searchTermLaw')).json()
				            .notify(this, 'setNumberOfResults')
				            .send();
			}
			console.log('search was triggered with: '+this.get('searchTermLaw'));
			this.set('searching', YES);
			//TwSprout.store.reset();
			//TwSprout.pubmedController.set('content', null);
			TwSprout.store.reset();
			var results = TwSprout.store.find(TwSprout.LAW_RESULTS_QUERY);
			//console.log("results are: "+results.length);
			results.refresh(); // this refresh makes sure that I get the update RecordArray displayed in the view
			//var results = TwSprout.store.find(SC.Query.remote(TwSprout.Pubmed, {orderBy: 'guid,title'}));

			this.set('content', results);
		},

		newSearch: function(evt){	 
 				//console.log("so far "+ this.get('searchTermLaw');
		},

		nextPage: function(){
			console.log("want to see NEXT page");
			this.set('currentPage', this.get('currentPage')+1);
			console.log(this.currentPage);
			this.searchPubmed();
		},

		previousPage: function(){
			console.log("want to see PREVIOUS page");
			if(this.get('currentPage') >1){
				this.set('currentPage', this.get('currentPage')-1);
				console.log(this.get('currentPage'));
				this.searchPubmed();
			}
		},

		firstPage: function(){
			console.log("want the FIRST page");
			if(this.get('currentPage') >1){
				this.set('currentPage', 1);
				console.log(this.get('currentPage'));
				this.searchPubmed();
			}
		},

		lastPage: function(){
		   console.log("want the LAST page");
			if(this.get('currentPage') < this.get('totalPages')){
				this.set('currentPage', this.get('totalPages'));
				console.log(this.get('currentPage'));
				this.searchPubmed();
			}	
		},
		enablePreviousButton: function(){
			if(this.get('currentPage') > 1 ){
				this.set('showPreviousButton', YES);
			}
			else{
				this.set('showPreviousButton', NO);
			}
		},
		enableNextButton: function(){
			if(this.get('currentPage') === this.get('totalPages') ){
				this.set('showLastButton', NO);
			}
			else{
				this.set('showLastButton', YES);
			}
		}

}) ;
