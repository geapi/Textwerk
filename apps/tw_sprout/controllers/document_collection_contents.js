// ==========================================================================
// TextWerk.collectionContentsController
// ==========================================================================
/*globals TextWerk */
sc_require('core');

/**
  @extends SC.ArrayController
  @author Georg Apitz
  
  
  This controller holds all the members of a collection that LinkIt can use
*/
TextWerk.documentCollectionContentsController = SC.ArrayController.create( 
  /* @scope TextWerk.collectionContentsController */{
    contentBinding: 'TextWerk.documentCollectionController.members',
    contentBindingDefault: SC.Binding.multiple().oneWay(),
    selection: null,

	test: function(){
		SC.Logger.log("content selection changed: "+ this.get('selection'));
	}.observes('selection')


});