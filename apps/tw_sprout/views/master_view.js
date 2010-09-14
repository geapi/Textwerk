// ==========================================================================
// Project:   TextWerk.PubmedEntryView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

Custom view that renders the overview of a pubmed entry

@extends SC.View */
sc_require('views/lawEntryView');
sc_require('ext/delegates');
sc_require('views/lineView');

TextWerk.MasterView = SC.View.extend(
/** @scope myApp.MasterView.prototype */ {
 
  classNames: ['master-view'],
 
  /**
    Necessary config elements to set up binding in the composite view
  */
  contentPath: '',      // Binding Path for the content of the ListView
  selectionPath: '',    // Binding Path for the selection on the ListView
  searchPath: '',       // Binding Path for the text searching
  contentValueKey: '',  // ContentValueKey to be passed to the ListView
  collectionViewRef: '',
 
  /**
    Overwritten createChildView where you set up all 
    the internal child view and where we are
    going to use the Binding Paths
  */
  createChildViews: function() {
    var childViews = [], view, collectRef;
 
    //Add the search text field
    collectRef = view = this.createChildView(
	  	SC.GridView.design({
            columnWidth: 150,
            rowHeight: 20,
			backgroundColor:'transparent',
			classNames: ['textwerk-grid'],
            //contentBinding: 'TextWerk.lawController.arrangedObjects',
            //selectionBinding: 'TextWerk.lawController.selection',
			//valueBinding: '',
            //delegate: TextWerk.rowDelegate,
            //selectionBindingDefault: 'SC.Binding.firstObject()',
            exampleView: TextWerk.LawEntryView,
			contentValueKey: this.get('contentValueKey'),
	        contentBinding: this.get('contentPath'),
	        selectionBinding: this.get('selectionPath'),
        }),	
      { rootElementPath: [0] }
    );
	this.set('collectionViewRef',view);
    childViews.push(view);
 	var sp = this.get('searchPath');
	//console.log("ref"+collectRef);
    view = this.createChildView(
		TextWerk.LineView.design({
			//valueBinding: sp,
			cr: collectRef,
		}),
      { rootElementPath: [1] }
    );
    childViews.push(view);
 
    this.set('childViews', childViews); 
  },
 
  /* Do Special Stuff as Needed */
});
