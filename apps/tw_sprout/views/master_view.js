// ==========================================================================
// Project:   TextWerk.PubmedEntryView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

Custom view that renders the overview of a pubmed entry

@extends SC.View */
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
  canvasReference: '',
 
  /**
    Overwritten createChildView where you set up all 
    the internal child view and where we are
    going to use the Binding Paths
  */
  createChildViews: function() {
    var childViews = [], view, collectRef, cRef;
 
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
			canvasRef: cRef,
            exampleView: TextWerk.LawEntryView,
			contentValueKey: this.get('contentValueKey'),
	        contentBinding: this.get('contentPath'),
	        selectionBinding: this.get('selectionPath'),
		    actOnSelect: YES,
            target: TextWerk.documentCollectionsController,
            action: 'changedCollection',
			mouseDown:function(evt){
				sc_super();
				console.log("mouse down on grid with: "+this.get('canvasRef'));
				var cv = this.get('canvasRef'); 
		        cv.mouseDown(evt);
				return NO;
			}
        }),	
      { rootElementPath: [0] }
    );
	this.set('collectionViewRef',view);
    childViews.push(view);
 	var sp = this.get('searchPath');
	//console.log("ref"+collectRef);
    cRef = view = this.createChildView(
		TextWerk.LineView.design({
			//valueBinding: sp,
			cr: collectRef,
		}),
      { rootElementPath: [1] }
    );
    collectRef.set('canvasRef',view);
	this.set('canvasReference', view);
    childViews.push(view);
 
    this.set('childViews', childViews); 
  },
 
  /* Do Special Stuff as Needed */
});
