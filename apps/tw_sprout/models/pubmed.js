// ==========================================================================
// Project:   TextWerk.Pubmed
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

(Document your Model here)

@extends SC.Record
@version 0.1
*/
TextWerk.Pubmed = SC.Record.extend(
/** @scope TextWerk.Pubmed.prototype */ {
	date: SC.Record.attr(String),
	authors: SC.Record.attr(String),
	title: SC.Record.attr(String),
	pmid: SC.Record.attr(String),
	pubmedurl: "/searchPubmed"
	
}) ;
