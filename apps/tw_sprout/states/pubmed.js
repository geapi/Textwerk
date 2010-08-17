// ==========================================================================
// Project:   TextWerk.PUBMED_CONTENT
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk*/

/** @class

  (Document Your State Here)

  @extends SC.Responder
*/
TextWerk.PUBMED_CONTENT = SC.Responder.create(
/** @scope TextWerk.PUBMED_CONTENT.prototype */ {
  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  // ..........................................................
  // EVENTS
  //
  didBecomeFirstResponder: function() {
    TextWerk.setPath('mainPage.mainPane.contentView.nowShowing', 'TextWerk.pubmedPage.pubmedView');
  },
  
  willLoseFirstResponder: function() {
    TextWerk.setPath('mainPage.mainPane.contentView.nowShowing', '');
  }
}) ;
