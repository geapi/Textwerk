// ==========================================================================
// Project:   TextWerk
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
TextWerk.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  
  // turns off the contextmenu aka right click
  //document.body.oncontextmenu = function(){ return false; };

  TextWerk.getPath('mainPage.mainPane').append(); 
  TextWerk.makeFirstResponder(TextWerk.LAW_CONTENT_TOPLEVEL);
 //TextWerk.makeFirstResponder(TextWerk.LAW_CONTENT_SECONDLEVEL);
  //TextWerk.makeFirstResponder(TextWerk.PUBMED_CONTENT);
  //TextWerk.server.preload(TextWerk.Pubmed.FIXTURES);
  //TextWerk.server.preload(TextWerk.Law.FIXTURES);  // doesn't work, not need to load fixtures, turn them on in the core.js by creating the store from fixtures

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!
	var query = SC.Query.local(TextWerk.Law, { orderBy: 'guid,name' });
	var results = TextWerk.store.find(TextWerk.Document);
	TextWerk.lawController.set('content', results);
	
	var store = TextWerk.get('store');
	TextWerk.documentCollectionsController.set('content', store.find(TextWerk.DocumentCollection));
	
	//var query = SC.Query.remote(TextWerk.Pubmed, { orderBy: 'guid,title' });
	//var results =  TextWerk.store.find(TextWerk.RESULTS_QUERY)
	//var results = TextWerk.store.find(query);
	//TextWerk.pubmedController.set('content', results);

} ;

function main() { TextWerk.main(); }
