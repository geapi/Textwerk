// ==========================================================================
// Project:   TextWerk
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
sc_require('ext/bindings');

TextWerk = SC.Application.create(
  /** @scope TextWerk.prototype */ {

  NAMESPACE: 'TextWerk',
  VERSION: '0.1.0',



  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures)
  


	//store: SC.Store.create({ 
  	//	commitRecordsAutomatically: YES
	//	}).from('TextWerk.PubmedDataSource')
		//}).from('TextWerk.LawDataSource')
  
  // TODO: Add global constants or singleton objects needed by your app here.

}) ;
