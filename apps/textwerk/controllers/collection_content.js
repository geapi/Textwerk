// ==========================================================================
// Project:   Textwerk.collectionContentController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk, Textwerk */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Textwerk.collectionContentController = SC.ArrayController.create(
/** @scope Textwerk.collectionContentController.prototype */ {

  	contentBinding: 'Textwerk.collectionController.members',
    contentBindingDefault: SC.Binding.multiple().oneWay(),
    selection: null

}) ;
