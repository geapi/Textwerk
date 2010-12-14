// ==========================================================================
// TextWerk.ListButtonView
// ==========================================================================
/*globals TextWerk, SCUI */

/** @class
  
  @extends SC.View
  @version ALPHA
  @since ALPHA

*/
TextWerk.ListButtonView = SC.View.extend( SCUI.SimpleButton,
/** @scope SC.DockButtonView.prototype */ {
  title: "",
  icon: null,
  hasState: NO,
  hasHover: YES,
  isSelected: NO,
  
  render: function(context, firstTime){
    context.begin('img').attr('src', sc_static('blank.gif')).end();
    sc_super();
  }
});
