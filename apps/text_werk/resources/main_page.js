// ==========================================================================
// Project:   TextWerk - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk LinkIt*/

// This page describes the main user interface for your application.
TextWerk.mainPage = SC.Page.design({
	
	invalidBrowserPane: SC.Pane.design({
    childViews: 'title main'.w(),

    title: SC.View.design({
      layout: {left: 0, top: 0, right: 0, height: 56},
      classNames: ['header'],
      render: function(context, firstTime){
        context = context.begin('div')
                    .addClass('logo')
                      .text('family tree')
                  .end();
        context = context.begin('div')
                    .addClass('blurb')
                      .text('a scui linkit example')
                  .end();
        context = context.begin('div')
                   .addClass('leaves')
                  .end();
      }
    }),

    main: SC.View.design({
      layout: {left: 0, top: 56, right: 0, bottom: 0},
      render: function(context, firstTime){
        context = context.begin('div')
                    .addClass('apology')
                      .text('Sorry, Linkit is designed for desktop application for now and we are working on adding mobile support...')
                  .end();
      }
    })
  }),
    // The main pane is made visible on screen as soon as your app is loaded.
    // Add childViews to this pane for views to display immediately on page
    // load.
    mainPane: SC.MainPane.design({
		childViews: 'topBar master footer canvas bottomBar'.w(),
		topBar: TextWerk.toolBars.top,

	    master: SC.ListView.design({
	      classNames: ['master-list'],
	      layout: { left: 0, top: 45, width: 259, bottom: 32 },
	      rowHeight: 43,
	      rowSpacing: 2,
	      exampleView: TextWerk.CollectionItemView,
	      selectionBinding: 'TextWerk.collectionsController.selection',
	      contentBinding: 'TextWerk.collectionsController',
	      contentValueKey: 'name',
	      actOnSelect: YES,
	      target: TextWerk.collectionsController,
	      action: 'changedCollection'
	    }),

	    footer: SC.View.design({
	      classNames: ['footer'],
	      layout: {left: 0, bottom: 32, width: 259, height: 35},
	      childViews: 'addCollectionButton removeCollectionButton'.w(),

	      addCollectionButton: TextWerk.ListButtonView.design({
	        layout: {centerX: -14, centerY: 0, height: 24, width: 27 },
	        classNames: ['add'],
	        target: TextWerk.collectionsController,
	        action: 'addCollection'
	      }),

	      removeCollectionButton: TextWerk.ListButtonView.design({
	        layout: {centerX: 13, centerY: 0, height: 24, width: 27 },
	        classNames: ['remove'],
	        target: TextWerk.collectionsController,
	        action: 'removeCollection'
	      })
	    }),

	    canvas: LinkIt.CanvasView.design({
	      layout: { left: 259, right: 0, top: 45, bottom: 32 },
	      classNames: ['collection-canvas'],
	      contentBinding: SC.Binding.from('TextWerk.collectionContentController').oneWay(),
	      selectionBinding: 'TextWerk.collectionContentController.selection',
	      nodeViewDelegate: TextWerk.collectionController,
	      exampleView: TextWerk.NodeView,
	      delegate: TextWerk.collectionController
	    }),    

	    palette: SC.View.design({
	      layout: {right: 0, top: 62, height: 222, width: 77 },
	      childViews: 'addDecorator addMale addFemale addPet'.w(),

	      addDecorator: SC.View.design({
	        layout: { left: 0, right: 0, top: 0, height: 23 },
	        classNames: ['add-decorator']
	      }),

	      addMale: TextWerk.AddButtonView.design({
	        layout: { left: 0, right: 0, top: 23, height: 65 },
	        classNames: ['add-male'],
	        title: "Male",
	        target: TextWerk.familyController,
	        action: 'addMale'
	      }),

	      addFemale: TextWerk.AddButtonView.design({
	        layout: { left: 0, right: 0, top: 88, height: 66 },
	        classNames: ['add-female'],
	        title: "Female",
	        target: TextWerk.familyController,
	        action: 'addFemale'
	      }),

	      addPet: TextWerk.AddButtonView.design({
	        layout: { left: 0, right: 0, top: 154, height: 68 },
	        classNames: ['add-pet'],
	        title: "Pet",
	        target: TextWerk.familyController,
	        action: 'addPet'
	      })
	    }),
        bottomBar: TextWerk.toolBars.bottom
    })

});

