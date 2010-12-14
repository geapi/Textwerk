// ==========================================================================
// Project:   TextWerk.collectionContentController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
TextWerk.collectionContentController = SC.ArrayController.create(
/** @scope TextWerk.collectionContentController.prototype */ {

  	contentBinding: 'TextWerk.collectionController.members',
    contentBindingDefault: SC.Binding.multiple().oneWay(),
    selection: null

}) ;
