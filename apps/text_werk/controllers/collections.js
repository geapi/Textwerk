// ==========================================================================
// Project:   TextWerk.collectionsController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
TextWerk.collectionsController = SC.ArrayController.create(
/** @scope TextWerk.collectionsController.prototype */ {

  	content: null,
    selection: null,
    
    changedCollection: function(){
      TextWerk.getPath('mainPage.mainPane.canvas').displayDidChange();
    },
    
    addCollection: function(){
      var store = TextWerk.get('store');
      if (store) {
        var collection = TextWerk.createRecord(TextWerk.Collection, {
          name: 'New Collection',
          papers: []
        });
      }
    },
    
    removeCollection: function(){
      var sel = this.getPath('selection.firstObject');
      TextWerk.destroyRecord(sel);
    }

}) ;
