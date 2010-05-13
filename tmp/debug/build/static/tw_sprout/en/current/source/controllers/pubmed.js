// ==========================================================================
// Project:   TwSprout.pubmedController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
TwSprout.pubmedController = SC.ArrayController.create(
/** @scope TwSprout.pubmedController.prototype */ {

  	resultcount: function() {
	    var len = this.get('length'), ret ;

	    if (len && len > 0) {
	      ret = len === 1 ? "1 result" : "%@ results".fmt(len);
	    } else ret = "No results";

	    return ret;
	  }.property('length').cacheable()

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('tw_sprout');