// ==========================================================================
// Project:   TwSprout - bottomView
// Copyright: ©2010 Apple, Inc.
// ==========================================================================
/*globals TwSprout */
TwSprout.bottomView =  SC.ToolbarView.design({
  layout: { bottom: 0, left: 0, right: 0, height: 32 },
  //childViews: 'firstButton previousButton currentPageView nextButton lastButton'.w(),
  anchorLocation: SC.ANCHOR_BOTTOM

  /*firstButton: SC.ButtonView.design({
        layout: { centerY: 0, height: 24, left: 12, width: 100 },
        title:  "| < first",
	    target: "TwSprout.lawController",
	    action: "firstPage",
		isVisibleBinding: 'TwSprout.lawController.showPreviousButton'
  }),

  previousButton: SC.ButtonView.design({
        layout: { centerY: 0, height: 24, left: 120, width: 100 },
        title:  "< previous",
	    target: "TwSprout.lawController",
	    action: "previousPage",
		isVisibleBinding: 'TwSprout.lawController.showPreviousButton'
		//valueBinding: "TwSprout.lawController.currentPage",
		//contentBinding: "TwSprout.lawController.currentPage"
  }),

  currentPageView: SC.LabelView.design({
        layout: { centerY: 0, height: 18, left: 200, right: 200 },
        textAlign: SC.ALIGN_CENTER,
        valueBinding: "TwSprout.lawController.displayCurrentPage",
        contentBinding: "TwSprout.lawController.displayCurrentPage"

  }),
  nextButton: SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 120, width: 100 },
        title:  "next >",
	    target: "TwSprout.lawController",
	    action: "nextPage",
	    isVisibleBinding: 'TwSprout.lawController.showLastButton'
  }),
  lastButton: SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 12, width: 100 },
        title:  "last > |",
	    target: "TwSprout.lawController",
	    action: "lastPage",
	    isVisibleBinding: 'TwSprout.lawController.showLastButton'
  })*/
});