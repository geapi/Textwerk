// ==========================================================================
// TextWerk.collectionsController
// ==========================================================================
/*globals TextWerk */
sc_require('core');

/**
  @extends SC.ArrayController
  @author Georg Apitz
  
  
  This controller holds all the collection  information. It transforms the objects array into a list of nodes
  that LinkIt can use.
*/
TextWerk.documentCollectionsController = SC.ArrayController.create( 
  /* @scope TextWerk.collectionsController */{
    content: null,
    selection: null,
    
    changedCollection: function(){
      TextWerk.getPath('lawViews.lawSecondLevelView.canvas').displayDidChange();
	  //TextWerk.lawViews.lawSecondLevelView.master
	   console.log("got a collection change");
    },
    
    addCollection: function(){
      var store = TextWerk.get('store');
      if (store) {
        var family = TextWerk.createRecord(TextWerk.Document, {
          name: 'New Collection',
          documents: []
        });
      }
    },
    
    removeCollection: function(){
      var sel = this.getPath('selection.firstObject');
      TextWerk.destroyRecord(sel);
    }
});