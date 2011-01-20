// ==========================================================================
// Project:   Textwerk.collectionsController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk, Textwerk */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Textwerk.collectionsController = SC.ArrayController.create(
/** @scope Textwerk.collectionsController.prototype */ {

  	content: null,
    selection: null,
    
    changedCollection: function(){
        console.log("collection changed");
     // Textwerk.getPath('mainPage.mainPane.canvas').displayDidChange();
    },
    _changedSelectedObject: function(){
        console.log("selection changed: "+this.get('selected'));
        var selectedCollection = CoreTextwerk.store.find(CoreTextwerk.Collection, this.get('selected'));
        this.selectObject(selectedCollection);
        //this.selectObject( this.get('selected'));
    }.observes('selected'),

    selected: null,
    
    addCollection: function(){
      var store = CoreTextwerk.get('store');
      if (store) {
        var collection = CoreTextwerk.createRecord(CoreTextwerk.Collection, {
          name: 'New Collection',
          papers: []
        });
      }
    },
    
    removeCollection: function(){
      var sel = this.getPath('selection.firstObject');
      CoreTextwerk.destroyRecord(sel);
    }

}) ;
