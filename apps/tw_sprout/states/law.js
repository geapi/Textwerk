// ==========================================================================
// Project:   TwSprout.LAW_CONTENT
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout*/

/** @class

  (Document Your State Here)

  @extends SC.Responder
*/
sc_require('views/law_views');
TwSprout.LAW_CONTENT_TOPLEVEL = SC.Responder.create(
/** @scope TwSprout.LAW_CONTENT.prototype */ {
  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  // ..........................................................
  // EVENTS
  //
  didBecomeFirstResponder: function() {
    TwSprout.setPath('mainPage.mainPane.middleView.nowShowing', 'TwSprout.lawViews.lawTopLevelView');
    //TwSprout.setPath('mainPage.mainPane.middleView.nowShowing', 'TwSprout.lawViews.lawSecondLevelView');
    //TwSprout.setPath('mainPage.mainPane.middleView.nowShowing', 'TwSprout.lawViews.lawFullTextView');
  },
  
  willLoseFirstResponder: function() {
    TwSprout.setPath('mainPage.mainPane.contentView.nowShowing', '');
  }
}) ;
TwSprout.LAW_CONTENT_SECONDLEVEL = SC.Responder.create(
/** @scope TwSprout.LAW_CONTENT.prototype */ {
  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  // ..........................................................
  // EVENTS
  //
  didBecomeFirstResponder: function() {
    //TwSprout.setPath('mainPage.mainPane.middleView.nowShowing', 'TwSprout.lawViews.lawTopLevelView');
    TwSprout.setPath('mainPage.mainPane.middleView.nowShowing', 'TwSprout.lawViews.lawSecondLevelView');
    //TwSprout.setPath('mainPage.mainPane.middleView.nowShowing', 'TwSprout.lawViews.lawFullTextView');
  },
  
  willLoseFirstResponder: function() {
    TwSprout.setPath('mainPage.mainPane.contentView.nowShowing', '');
  }
}) ;