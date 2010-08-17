// ==========================================================================
// Project:   TextWerk.Law
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
TextWerk.Law = SC.Record.extend(
/** @scope TextWerk.Law.prototype */ {

  	date: SC.Record.attr(String),
	doc_type: SC.Record.attr(String),
	description: SC.Record.attr(String),
	position: SC.Record.attr(String),
	name: SC.Record.attr(String)

}) ;
