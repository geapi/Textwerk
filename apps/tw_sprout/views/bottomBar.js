// ==========================================================================
// Project:   TextWerk - bottomView
// Copyright: ©2010 Apple, Inc.
// ==========================================================================
/*globals TextWerk */
TextWerk.bottomBar =  SC.ToolbarView.design({
  layout: { bottom: 0, left: 0, right: 0, height: 32 },
  childViews: 'previousButton'.w(),//' currentPageView nextButton lastButton'.w(),
  anchorLocation: SC.ANCHOR_BOTTOM,

  /*firstButton: SC.ButtonView.design({
        layout: { centerY: 0, height: 24, left: 12, width: 100 },
        title:  "| < first",
	    target: "TextWerk.lawController",
	    action: "firstPage",
		isVisibleBinding: 'TextWerk.lawController.showPreviousButton'
  }),*/

  previousButton: SC.ButtonView.design({
        layout: { centerY: 0, height: 24, left: 12, width: 100 },
        title:  "< back",
	    target: "TextWerk.lawController",
	    action: "previousPage",
		isVisibleBinding: 'TextWerk.lawController.showPreviousButton'
		//valueBinding: "TextWerk.lawController.currentPage",
		//contentBinding: "TextWerk.lawController.currentPage"
  })
  /*
  currentPageView: SC.LabelView.design({
        layout: { centerY: 0, height: 18, left: 200, right: 200 },
        textAlign: SC.ALIGN_CENTER,
        valueBinding: "TextWerk.lawController.displayCurrentPage",
        contentBinding: "TextWerk.lawController.displayCurrentPage"

  }),
  nextButton: SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 120, width: 100 },
        title:  "next >",
	    target: "TextWerk.lawController",
	    action: "nextPage",
	    isVisibleBinding: 'TextWerk.lawController.showLastButton'
  }),
  lastButton: SC.ButtonView.design({
        layout: { centerY: 0, height: 24, right: 12, width: 100 },
        title:  "last > |",
	    target: "TextWerk.lawController",
	    action: "lastPage",
	    isVisibleBinding: 'TextWerk.lawController.showLastButton'
  })*/
});