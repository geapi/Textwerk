// ==========================================================================
// Project:   Textwerk
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk, Textwerk */

//
Textwerk.main = function main() {
    document.title ="TextWerk - The Indicator of Influence visualization";
	if(SC.browser.isMobileSafari || SC.browser.isiPhone){
	    Textwerk.getPath('mainPage.invalidBrowserPane').append() ;
	  } else {
		
		if (window.location.hash.toString().match('fixtures')) {
	    	CoreTextwerk.set('dataSourceType', CoreTextwerk.FIXTURES_DATA_SOURCE);
	  	}
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
