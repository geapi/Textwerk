// ==========================================================================
// Project:   TextWerk - Core Actions
// Copyright: ©2010 Georg Apitz
// @author Georg Apitz
// ==========================================================================
/*globals TextWerk */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/

TextWerk.mixin({
	deleteSelectedMembers: function() {
	    var selection, toRemove, collection, 
	        len, confirmStr, alertController,
	        fc = TextWerk.collectionController;

	    selection = TextWerk.collectionContentController.get('selection');
	    toRemove = [];
	    collection = fc.get('content');

	    if (selection) {
	      len = selection.get('length');
	      confirmStr = (len === 1) ? "Are you sure you want to delete this member" : "Are you sure you want to delete these members";
	      alertController = SC.Object.create({

	        button1Action: function() {
	          // copy to a separate array since deleting elements changes the selection set itself
	          if (selection && selection.isEnumerable) {
	            selection.forEach(function(element) {
	              toRemove.push(element);
	            });
	          }

	          if (collection) {
	            toRemove.forEach(function(member) {
	              collection.removeMember(member);
	            });
	          }
	        },

	        alertPaneDidDismiss: function(pane, status) {
	          switch(status) {
	            case SC.BUTTON1_STATUS:
	              if (this.button1Action) this.button1Action();
	              break;

	            case SC.BUTTON2_STATUS:
	              if (this.button2Action) this.button2Action();
	              break;
	          }
	        }
	      });

	      SC.AlertPane.warn("Delete?", confirmStr, '', "Delete", "Cancel", '', alertController);
	    }
	  }
	
});