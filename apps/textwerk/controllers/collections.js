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
    },
    total: function(){
        if(this.get('content')){
        return "Years: (%@)".fmt(this.get('content').get('length'));
        }else {
            return "Years: still computing ...";
        }


        //return "Years:";
    }.property().observes('length')

}) ;
