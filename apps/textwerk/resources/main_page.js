// ==========================================================================
// Project:   Textwerk - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Textwerk LinkIt*/

// This page describes the main user interface for your application.
Textwerk.mainPage = SC.Page.design({
	
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
		topBar: Textwerk.toolBars.top,

		master: SC.ScrollView.design(SC.Border, {
      borderStyle: SC.BORDER_GRAY,
			layout: { left: 0, top: 45, width: 259, bottom: 55 },
      hasVerticalScroller: YES,
	    	contentView: SC.ListView.design({
	    	  classNames: ['master-list'],
	    	  layout: { left: 0, top: 0, width: 259, bottom: 0 },
	    	  rowHeight: 43,
	    	  rowSpacing: 2,
	    	  exampleView: Textwerk.CollectionItemView,
	    	  selectionBinding: 'Textwerk.collectionsController.selection',
	    	  contentBinding: 'Textwerk.collectionsController',
	    	  contentValueKey: 'name',
	    	  actOnSelect: YES,
	    	  target: Textwerk.collectionsController,
	    	  action: 'changedCollection'
	    	})
			}),

	    footer: SC.View.design({
	      classNames: ['footer'],
	      layout: {left: 0, bottom: 32, width: 259, height: 35},
	      childViews: 'addCollectionButton removeCollectionButton'.w(),

	      addCollectionButton: Textwerk.ListButtonView.design({
	        layout: {centerX: -14, centerY: 0, height: 24, width: 27 },
	        classNames: ['add'],
	        target: Textwerk.collectionsController,
	        action: 'addCollection'
	      }),

	      removeCollectionButton: Textwerk.ListButtonView.design({
	        layout: {centerX: 13, centerY: 0, height: 24, width: 27 },
	        classNames: ['remove'],
	        target: Textwerk.collectionsController,
	        action: 'removeCollection'
	      })
	    }),

	    canvas: LinkIt.CanvasView.design({
	      layout: { left: 259, right: 0, top: 45, bottom: 32 },
	      classNames: ['collection-canvas'],
	      contentBinding: SC.Binding.from('Textwerk.collectionContentController').oneWay(),
	      selectionBinding: 'Textwerk.collectionContentController.selection',
	      nodeViewDelegate: Textwerk.collectionController,
	      exampleView: Textwerk.NodeView,
	      delegate: Textwerk.collectionController
	    }),    

	    palette: SC.View.design({
	      layout: {right: 0, top: 62, height: 222, width: 77 },
	      childViews: 'addDecorator addMale addFemale addPet'.w(),

	      addDecorator: SC.View.design({
	        layout: { left: 0, right: 0, top: 0, height: 23 },
	        classNames: ['add-decorator']
	      }),

	      addMale: Textwerk.AddButtonView.design({
	        layout: { left: 0, right: 0, top: 23, height: 65 },
	        classNames: ['add-male'],
	        title: "Male",
	        target: Textwerk.familyController,
	        action: 'addMale'
	      }),

	      addFemale: Textwerk.AddButtonView.design({
	        layout: { left: 0, right: 0, top: 88, height: 66 },
	        classNames: ['add-female'],
	        title: "Female",
	        target: Textwerk.familyController,
	        action: 'addFemale'
	      }),

	      addPet: Textwerk.AddButtonView.design({
	        layout: { left: 0, right: 0, top: 154, height: 68 },
	        classNames: ['add-pet'],
	        title: "Pet",
	        target: Textwerk.familyController,
	        action: 'addPet'
	      })
	    }),
        bottomBar: Textwerk.toolBars.bottom
    })

});

