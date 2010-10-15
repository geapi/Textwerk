// ==========================================================================
// TextWerk.documentCollectionController
// ==========================================================================
/*globals TextWerk */

sc_require('core');

/**
  @extends SC.ArrayController
  @author Georg Apitz
  
  
  This controller holds all the collection information. It transforms the objects array into a list of nodes
  that LinkIt can use.
*/
TextWerk.documentCollectionController = SC.ObjectController.create( 
  /* @scope */{

  // PUBLIC PROPERTIES

  /**
    Don't allow typical array actions on the content of this controller since
    our model setup doesn't let us do that either.  We have to add and remove
    campaign elements in particular ways.
  */
  isEditable: NO,
  
  contentBinding: 'TextWerk.documentCollectionsController.selection',
  contentBindingDefault: SC.Binding.oneWay().single(),

  // PUBLIC METHODS
  /**
    Add a new male to the family.
  */
  addDocument: function() {
    var c = this.get('content') || null;
    if(c) c.addMember(TextWerk.Document, YES);
  },
  // Special Function for LinkIt to create the Example View for the Node
  exampleViewForNode: function(node) {
    //console.log('%@.exampleViewForContent(%@)'.fmt(this, node));

    if (node.instanceOf(TextWerk.Document)) {
      return TextWerk.DocumentView;
    }
    
    return null;
  }

  

});