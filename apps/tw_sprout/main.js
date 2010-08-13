// ==========================================================================
// Project:   TwSprout
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
TwSprout.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  TwSprout.getPath('mainPage.mainPane').append() ; 
  TwSprout.makeFirstResponder(TwSprout.LAW_CONTENT_TOPLEVEL);
  //TwSprout.makeFirstResponder(TwSprout.PUBMED_CONTENT);
  //TwSprout.server.preload(TwSprout.Pubmed.FIXTURES);
  //TwSprout.server.preload(TwSprout.Law.FIXTURES);  // doesn't work, not need to load fixtures, turn them on in the core.js by creating the store from fixtures

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!
	var query = SC.Query.local(TwSprout.Law, { orderBy: 'guid,name' });
	var results = TwSprout.store.find(query);
	TwSprout.lawController.set('content', results);
	
	//var query = SC.Query.remote(TwSprout.Pubmed, { orderBy: 'guid,title' });
	//var results =  TwSprout.store.find(TwSprout.RESULTS_QUERY)
	//var results = TwSprout.store.find(query);
	//TwSprout.pubmedController.set('content', results);

} ;

function main() { TwSprout.main(); }
