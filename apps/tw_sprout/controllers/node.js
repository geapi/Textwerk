// ==========================================================================
// Project:   TextWerk.nodeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController

*/
sc_require('core');

/**
  @extends SC.ArrayController
  @author Evin Grano
  
  
  This controller holds all the members of a family that LinkIt can use
*/
TextWerk.nodeController = SC.ArrayController.create( 
  /* @scope TextWerk.nodeController */{
    contentBinding: 'TextWerk.groupController.members',
    contentBindingDefault: SC.Binding.multiple().oneWay(),
    selection: null
});