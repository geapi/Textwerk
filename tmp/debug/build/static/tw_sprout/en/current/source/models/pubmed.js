// ==========================================================================
// Project:   TwSprout.Pubmed
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

(Document your Model here)

@extends SC.Record
@version 0.1
*/
TwSprout.Pubmed = SC.Record.extend(
/** @scope TwSprout.Pubmed.prototype */ {
	date: SC.Record.attr(String),
	authors: SC.Record.attr(String),
	title: SC.Record.attr(String),
	pmid: SC.Record.attr(String),
	pubmedurl: "/searchPubmed"
	
}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('tw_sprout');