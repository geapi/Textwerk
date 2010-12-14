// ==========================================================================
// Project:   TextWerk.AclPaper
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */


/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
TextWerk.AclPaper = SC.Record.extend(
/** @scope TextWerk.AclPaper.prototype */ {

  	title: SC.Record.attr(String),
  	authors: SC.Record.attr(String),
  	venue: SC.Record.attr(String),
	year: SC.Record.attr(Number),
	icon: function(){
		return 'sc-icon-document-16';
	}.property().cacheable(),
	description: function(){
		return this.get('guid').substring(0,1);
	}.property().cacheable()

});
