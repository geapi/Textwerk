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
      Textwerk.getPath('mainPage.mainPane.canvas').displayDidChange();
    },
    
    addCollection: function(){
      var store = Textwerk.get('store');
      if (store) {
        var collection = Textwerk.createRecord(Textwerk.Collection, {
          name: 'New Collection',
          papers: []
        });
      }
    },
    
    removeCollection: function(){
      var sel = this.getPath('selection.firstObject');
      Textwerk.destroyRecord(sel);
    }

}) ;
