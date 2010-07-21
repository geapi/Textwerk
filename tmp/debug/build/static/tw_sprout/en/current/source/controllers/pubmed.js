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

  	resultcount: function() {
	    var len = this.get('length'), ret ;

	    if (len && len > 0) {
	      ret = len === 1 ? "1 result" : "%@ results".fmt(len);
	    } else ret = "No results";

	    return ret;
	  }.property('length').cacheable(),
	
	hightlight: function(){
		var content = this.get('content');
		var authors = content.get('authors');
	},
	resultsDidChange: function(){ 
		//var content = this.get('content');
		results = TwSprout.store.find(TwSprout.Pubmed);
		console.log("new content -> %@,".fmt(results.getEach('pmid')));
	}.observes('content'),  
	
	isSelected: function(){
	   console.log('just got selected');   
	}.observes('selected'),
	
   //arrangedObjects: function(){
   //	arguments.callee.base.apply(this,arguments);
   //}
	searchPubmed: function(){
		//alert('search was triggered with: '+this.searchTerm);
		var results = TwSprout.store.find(TwSprout.RESULTS_QUERY);
		TwSprout.pubmedController.set('content', results);
	}

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('tw_sprout');