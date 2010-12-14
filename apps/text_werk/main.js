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
	if(SC.browser.isMobileSafari || SC.browser.isiPhone){
	    TextWerk.getPath('mainPage.invalidBrowserPane').append() ;
	  } else {
		
		if (window.location.hash.toString().match('fixtures')) {
	    	TextWerk.store.from(SC.Record.fixtures);
			TextWerk.set('loadingFromFixtures', YES);
	  	}
    // Step 1: Instantiate Your Views
    // The default code here will make the mainPane for your application visible
    // on screen.  If you app gets any level of complexity, you will probably
    // create multiple pages and panes.
    TextWerk.getPath('mainPage.mainPane').append();

    var store = TextWerk.get('store');

    // Step 2. Set the content property on your primary controller.
    // This will make your app come alive!
    // Set the content property on your primary controller
    TextWerk.collectionsController.set('content', store.find(TextWerk.Collection));
	//store.find(TextWerk.Paper)
    //TextWerk.aclPapersController.set('content', store.find(TextWerk.AclPaper));
	//TextWerk.getDistinctYears();
	}

};

function main() {
    TextWerk.main();
}
