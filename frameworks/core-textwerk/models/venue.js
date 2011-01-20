// ==========================================================================
// Project:   CoreTextwerk.Venue
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CoreTextwerk.Venue = SC.Record.extend(
/** @scope CoreTextwerk.Venue.prototype */ {

    primaryKey: 'id',
    name: SC.Record.attr(String),
    url: "/venues"

}) ;
