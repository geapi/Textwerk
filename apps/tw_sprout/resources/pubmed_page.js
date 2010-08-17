// ==========================================================================
// Project:   Sproutweets - statusPage
// Copyright: ©2010 Apple, Inc.
// ==========================================================================
/*globals TextWerk */

TextWerk.pubmedPage = SC.Page.design({
	pubmedView: SC.View.design({
	childViews: 'middleView topView bottomView'.w(),

	    topView: SC.ToolbarView.design({
	      layout: { top: 0, left: 0, right: 0, height: 45 }, 
		  childViews: 'labelView taglineView searchedTerm loadingImage searchField searchButton'.w(),
	      anchorLocation: SC.ANCHOR_TOP,

		 labelView: SC.LabelView.design({
		        layout: { centerY: 0, height: 24, left: 8, width:200, top:5 },
		        controlSize: SC.LARGE_CONTROL_SIZE,
		        fontWeight: SC.BOLD_WEIGHT,
		        value:   'TextWerk'
		      }),
		taglineView: SC.LabelView.design({
		        layout: { centerY: 0, height: 24, left: 8, width: 300, top: 25 },
		        controlSize: SC.SMALL_CONTROL_SIZE,
		        fontWeight: SC.BOLD_WEIGHT,
		        value:   'visualizing indicators of influence (pubmed corpus)'
		      }),
		searchedTerm: SC.LabelView.design({
			        layout: { centerY: 0, height: 18, left: 200, right: 200, width: 700},
			        textAlign: SC.ALIGN_CENTER,
			        valueBinding: 'TextWerk.pubmedController.searchTermOverview',
					contentBinding: 'TextWerk.pubmedController.searchTermOverview'

			  }),
		 loadingImage: SC.ImageView.design({
		    layout: { top: 14, height: 16,  right: 350, width: 16 },
		    value: sc_static('images/loading'),
		    useImageCache: NO,
		    isVisibleBinding: 'TextWerk.pubmedController.searching'
		  }),
		 searchField: SC.TextFieldView.design({
		        layout: { centerY: 0, height: 24, right: 120, width: 200 },
		        controlSize: SC.LARGE_CONTROL_SIZE,
		        fontWeight: SC.BOLD_WEIGHT,
		        hint:   'type your search here',
				valueBinding: 'TextWerk.pubmedController.searchTerm',
				target: "TextWerk.pubmedController",
				action: "newSearch",
				keyDown: function(evt) {
 					sc_super(); // necessary to guarantee regular handling of keyDown events, 
								// want to avoid that this overwrite messes everything up
					if (evt.charCode === 13) {
						// trigger the search after we've seen an "enter", seems to have hickups in FF
							TextWerk.pubmedController.searchPubmed(); 
					        return YES;
					      } else {
					        return NO;
					      }
				}
		      }),  

		 searchButton: SC.ButtonView.design({
	        layout: { centerY: 0, height: 24, right: 12, width: 100 },
	        title:  "Search",
			target: "TextWerk.pubmedController",
			action: "searchPubmed"
	      })
	    }),

	    middleView: SC.ScrollView.design({
	      hasHorizontalScroller: NO,
	      layout: { top: 45, bottom: 32, left: 0, right: 0 },
	      backgroundColor: 'white',
	     	contentView: SC.GridView.design({
		 	  columnWidth: 220,
		 	  rowHeight: 200, 
		 	  contentBinding: 'TextWerk.pubmedController.arrangedObjects',
		 	  valueBinding: 'TextWerk.pubmedController.arrangedObjects',
		 	  selectionBinding: 'TextWerk.pubmedController.selection', 
		 	  exampleView: TextWerk.PubmedEntryView

	     	})
	    }),

	    bottomView: SC.ToolbarView.design({
	      layout: { bottom: 0, left: 0, right: 0, height: 32 },
		  childViews: 'firstButton previousButton currentPageView nextButton lastButton'.w(),
	      anchorLocation: SC.ANCHOR_BOTTOM,

		  firstButton: SC.ButtonView.design({
	            layout: { centerY: 0, height: 24, left: 12, width: 100 },
	            title:  "| < first",
			    target: "TextWerk.pubmedController",
			    action: "firstPage",
				isVisibleBinding: 'TextWerk.pubmedController.showPreviousButton'
	      }),

		  previousButton: SC.ButtonView.design({
	            layout: { centerY: 0, height: 24, left: 120, width: 100 },
	            title:  "< previous",
			    target: "TextWerk.pubmedController",
			    action: "previousPage",
				isVisibleBinding: 'TextWerk.pubmedController.showPreviousButton'
				//valueBinding: "TextWerk.pubmedController.currentPage",
				//contentBinding: "TextWerk.pubmedController.currentPage"
	      }),

		  currentPageView: SC.LabelView.design({
		        layout: { centerY: 0, height: 18, left: 200, right: 200 },
		        textAlign: SC.ALIGN_CENTER,
		        valueBinding: "TextWerk.pubmedController.displayCurrentPage",
		        contentBinding: "TextWerk.pubmedController.displayCurrentPage"

		  }),
		  nextButton: SC.ButtonView.design({
	            layout: { centerY: 0, height: 24, right: 120, width: 100 },
	            title:  "next >",
			    target: "TextWerk.pubmedController",
			    action: "nextPage",
			    isVisibleBinding: 'TextWerk.pubmedController.showLastButton'
	      }),
		  lastButton: SC.ButtonView.design({
		        layout: { centerY: 0, height: 24, right: 12, width: 100 },
	            title:  "last > |",
			    target: "TextWerk.pubmedController",
			    action: "lastPage",
			    isVisibleBinding: 'TextWerk.pubmedController.showLastButton'
		  })
	    })
	  })
});