// ==========================================================================
// Project:   Sproutweets - collectionDelegate
// Copyright: ©2010 
// ==========================================================================
/*globals TextWerk */

TextWerk.rowDelegate = SC.Object.create(SC.CollectionRowDelegate, {
	/** walk like a duck */
	  isCollectionRowDelegate: YES,

	  /**
	    Default row height.  Unless you implement some custom row height 
	    support, this row height will be used for all items.

	    @property
	    @type Number
	  */
	  rowHeight: 150,

	  /**
	    Index set of rows that should have a custom row height.  If you need 
	    certains rows to have a custom row height, then set this property to a 
	    non-null value.  Otherwise leave it blank to disable custom row heights.

	    @property
	    @type SC.IndexSet
	  */
	  customRowHeightIndexes: function() {
		return null;
	  }.property(),//TextWerk.getPath('lawController.selectedObject.length')).cacheable(),

	  /**
	    Called for each index in the customRowHeightIndexes set to get the 
	    actual row height for the index.  This method should return the default
	    rowHeight if you don't want the row to have a custom height.

	    The default implementation just returns the default rowHeight.

	    @param {SC.CollectionView} view the calling view
	    @param {Object} content the content array
	    @param {Number} contentIndex the index 
	    @returns {Number} row height
	  */
	  contentIndexRowHeight: function(view, content, contentIndex) {
		console.log("contentIndexRowHeight called");
	    return this.get('rowHeight');    
	  }
	
});
