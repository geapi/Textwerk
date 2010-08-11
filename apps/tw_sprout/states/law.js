// ==========================================================================
// Project:   TwSprout.LAW_CONTENT
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout*/

/** @class

  (Document Your State Here)

  @extends SC.Responder
*/
TwSprout.LAW_CONTENT = SC.Responder.create(
/** @scope TwSprout.LAW_CONTENT.prototype */ {
  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  // ..........................................................
  // EVENTS
  //
  didBecomeFirstResponder: function() {
    TwSprout.setPath('mainPage.mainPane.contentView.nowShowing', 'TwSprout.lawPage.lawView');
  },
  
  willLoseFirstResponder: function() {
    TwSprout.setPath('mainPage.mainPane.contentView.nowShowing', '');
  }
}) ;