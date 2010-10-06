// ==========================================================================
// Project:   TextWerk - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

// This page describes the main user interface for your application.  
TextWerk.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'middleView topView bottomView'.w(),
	    topView: TextWerk.topBar,
		//graphView: TextWerk.GraphView,
		//graphView: TextWerk.LineView,
		
	    middleView: SC.ContainerView.design({
	      layout: { top: 45, bottom: 32, left: 0, right: 0 },
	      backgroundColor: 'white',
	      //selectionBinding: 'TextWerk.lawController.selection'
	    }),
     	

	    bottomView: TextWerk.bottomBar
  })
});
