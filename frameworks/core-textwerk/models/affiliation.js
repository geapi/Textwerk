// ==========================================================================
// Project:   CoreTextwerk.Affiliation
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CoreTextwerk.Affiliation = SC.Record.extend(
/** @scope CoreTextwerk.Affiliation.prototype */ {

  primaryKey: 'id',
    name: SC.Record.attr(String),
    url: "/affiliations"

}) ;
