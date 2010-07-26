// ==========================================================================
// Project:   TwSprout - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

// This page describes the main user interface for your application.  
TwSprout.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
   	childViews: 'middleView topView bottomView'.w(),

	    topView: SC.ToolbarView.design({
	      layout: { top: 0, left: 0, right: 0, height: 36 }, 
		  childViews: 'labelView searchField searchButton'.w(),
	      anchorLocation: SC.ANCHOR_TOP,
	
		 labelView: SC.LabelView.design({
		        layout: { centerY: 0, height: 24, left: 8, width: 200 },
		        controlSize: SC.LARGE_CONTROL_SIZE,
		        fontWeight: SC.BOLD_WEIGHT,
		        value:   'PubMed TextWerk'
		      }),
		 searchField: SC.TextFieldView.design({
		        layout: { centerY: 0, height: 24, right: 120, width: 200 },
		        controlSize: SC.LARGE_CONTROL_SIZE,
		        fontWeight: SC.BOLD_WEIGHT,
		        hint:   'type your search here',
				valueBinding: 'TwSprout.pubmedController.searchTerm',
				target: "TwSprout.pubmedController",
				action: "newSearch",
				keyDown: function(evt) {
 					arguments.callee.base.apply(this,arguments); // necessary to guarantee regular handling of keyDown events, want to avoid that this overwrite messes everything up
					if (evt.charCode === 13) {
							TwSprout.pubmedController.searchPubmed(); // trigger the search after we've seen an "enter"
					        return YES;
					      } else {
					        return NO;
					      }
				}
		      }),  

		 searchButton: SC.ButtonView.design({
	        layout: { centerY: 0, height: 24, right: 12, width: 100 },
	        title:  "Search",
			target: "TwSprout.pubmedController",
			action: "searchPubmed"
	      })
	    }),

	    middleView: SC.ScrollView.design({
	      hasHorizontalScroller: NO,
	      layout: { top: 36, bottom: 32, left: 0, right: 0 },
	      backgroundColor: 'white',

	      contentView: SC.GridView.design({
			columnWidth: 220,
			rowHeight: 200, 
			contentBinding: 'TwSprout.pubmedController.arrangedObjects',
			valueBinding: 'TwSprout.pubmedController.arrangedObjects',
			selectionBinding: 'TwSprout.pubmedController.selection', 
			exampleView: TwSprout.PubmedEntryView
           
	      })
	    }),

	    bottomView: SC.ToolbarView.design({
	      layout: { bottom: 0, left: 0, right: 0, height: 32 },
		  childViews: 'summaryView'.w(),
	      anchorLocation: SC.ANCHOR_BOTTOM,
	
		  summaryView: SC.LabelView.design({
		        layout: { centerY: 0, height: 18, left: 20, right: 20 },
		        textAlign: SC.ALIGN_CENTER,
		        valueBinding: "TwSprout.pubmedController.resultcount"
		  })
	    })
	  })

});
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('tw_sprout');