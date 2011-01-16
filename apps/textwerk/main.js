// ==========================================================================
// Project:   Textwerk
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk, Textwerk */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Textwerk.main = function main() {
	if(SC.browser.isMobileSafari || SC.browser.isiPhone){
	    Textwerk.getPath('mainPage.invalidBrowserPane').append() ;
	  } else {
		
		if (window.location.hash.toString().match('fixtures')) {
	    	CoreTextwerk.set('dataSourceType', CoreTextwerk.FIXTURES_DATA_SOURCE);
	  	}
    // Step 1: Instantiate Your Views
    // The default code here will make the mainPane for your application visible
    // on screen.  If you app gets any level of complexity, you will probably
    // create multiple pages and panes.
    Textwerk.statechart.initStatechart();
        
    /*Textwerk.getPath('mainPage.mainPane').append();

    var store = CoreTextwerk.get('store');

    // Step 2. Set the content property on your primary controller.
    // This will make your app come alive!
    // Set the content property on your primary controller
    Textwerk.collectionsController.set('content', store.find(CoreTextwerk.Collection));
	   store.find(CoreTextwerk.Paper)
    //Textwerk.aclPapersController.set('content', store.find(Textwerk.AclPaper));
	//Textwerk.getDistinctYears();*/
	}

};

function main() {
    Textwerk.main();
}
