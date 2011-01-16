// ==========================================================================
// Project:   Textwerk.collectionController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk, Textwerk */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Textwerk.collectionController = SC.ObjectController.create(
/** @scope Textwerk.collectionController.prototype */ {

  	// PUBLIC PROPERTIES

	  /**
	    Don't allow typical array actions on the content of this controller since
	    our model setup doesn't let us do that either.  We have to add and remove
	    campaign elements in particular ways.
	  */
	  isEditable: NO,

	  contentBinding: 'Textwerk.collectionsController.selection',
	  contentBindingDefault: SC.Binding.oneWay().single(),

	  // LinkIt Canvas is a Collection Views so to correct the deletion you have to include this
	  /**
	    Delegate for SC.CollectionView's deletion.  We implement this here
	    because we have to handle deletion very carefully, but we still want to be able to
	    trigger it by pressing the delete key on the canvas.
	  */
	  collectionViewDeleteContent: function(view, content, indexes) {
	    Textwerk.deleteSelectedMembers();
	    return YES;
	  },

	  // PUBLIC METHODS
	  /**
	    Add a new document to the collection.
	  */
	  addDocument: function() {
	    var c = this.get('content') || null;
	    if(c) c.addMember(Textwerk.Paper, YES);
	  }

}) ;
