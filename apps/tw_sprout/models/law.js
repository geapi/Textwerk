// ==========================================================================
// Project:   TwSprout.Law
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
TwSprout.Law = SC.Record.extend(
/** @scope TwSprout.Law.prototype */ {

  	date: SC.Record.attr(String),
	authors: SC.Record.attr(String),
	title: SC.Record.attr(String),
	pmid: SC.Record.attr(String),
	pubmedurl: "/searchPubmed"

}) ;
