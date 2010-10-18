// ==========================================================================
// Project:   TextWerk.LAW_CONTENT
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk*/

/** @class

  (Document Your State Here)

  @extends SC.Responder
*/
sc_require('views/law_views');
TextWerk.LAW_CONTENT_TOPLEVEL = SC.Responder.create(
/** @scope TextWerk.LAW_CONTENT.prototype */ {
  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  // ..........................................................
  // EVENTS
  //
  didBecomeFirstResponder: function() {
    TextWerk.setPath('mainPage.mainPane.middleView.nowShowing', 'TextWerk.lawViews.lawTopLevelView');
    //TextWerk.setPath('mainPage.mainPane.middleView.nowShowing', 'TextWerk.lawViews.lawSecondLevelView');
    //TextWerk.setPath('mainPage.mainPane.middleView.nowShowing', 'TextWerk.lawViews.lawFullTextView');
  },
  
  willLoseFirstResponder: function() {
    TextWerk.setPath('mainPage.mainPane.contentView.nowShowing', '');
  }
}) ;
TextWerk.LAW_CONTENT_SECONDLEVEL = SC.Responder.create(
/** @scope TextWerk.LAW_CONTENT.prototype */ {
  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  // ..........................................................
  // EVENTS
  //
  didBecomeFirstResponder: function() {
    //TextWerk.setPath('mainPage.mainPane.middleView.nowShowing', 'TextWerk.LawDetailView');
    //console.log("2nd level got first responder");
    //TextWerk.documentCollectionsController.selection = 1;
    TextWerk.setPath('mainPage.mainPane.middleView.nowShowing', 'TextWerk.lawViews.lawSecondLevelView');
    //TextWerk.setPath('mainPage.mainPane.middleView.nowShowing', 'TextWerk.lawViews.lawFullTextView');
  },
  
  willLoseFirstResponder: function() {
    TextWerk.setPath('mainPage.mainPane.contentView.nowShowing', '');
  }
}) ;