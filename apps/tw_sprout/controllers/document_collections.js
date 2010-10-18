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
    selectedCollection: null,
    
    isSelectedChanged: function(){
	console.log("selection: "+ this.getPath('selection.firstObject').get('collection'));
	console.log("content: "+ this.get('content').get('length'));
	this.set("selectedCollection", this.getPath('selection.firstObject').get('collection'));
		if (TextWerk.LAW_CONTENT_SECONDLEVEL.isFirstResponder) {
            TextWerk.makeFirstResponder(TextWerk.LAW_CONTENT_TOPLEVEL);
        } else
        {
            TextWerk.makeFirstResponder(TextWerk.LAW_CONTENT_SECONDLEVEL);
        }
      TextWerk.getPath('lawViews.lawSecondLevelView.canvas').displayDidChange();
	  //TextWerk.lawViews.lawSecondLevelView.master
	   console.log("got a collection change");
    }.observes('selection'),
    
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
    },
    content5: function(){
		SC.Logger.log("selected Collection changed");
	}.observes('selectedCollection'),
});