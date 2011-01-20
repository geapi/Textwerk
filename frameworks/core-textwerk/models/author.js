// ==========================================================================
// Project:   CoreTextwerk.Author
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk */

/** @class

        (Document your Model here)

 @extends SC.Record
 @version 0.1
 */
CoreTextwerk.Author = SC.Record.extend(
    /** @scope CoreTextwerk.Author.prototype */ {

    primaryKey: 'id',
    name: SC.Record.attr(String),
    url: "/authors"

});
