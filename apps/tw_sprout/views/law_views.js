// ==========================================================================
// Project:   Sproutweets - statusPage
// Copyright: ©2010 Apple, Inc.
// ==========================================================================
/*globals TwSprout */
sc_require('views/lawEntryTopLevel');
sc_require('views/lawEntrySecondLevel');

TwSprout.lawViews = SC.Page.design({
	lawTopLevelView: SC.ScrollView.design({
	      hasHorizontalScroller: NO,
	      layout: { top: 0, bottom: 0, left: 0, right: 0 },
	      backgroundColor: 'white',
	     	contentView: SC.GridView.design({
		 	  columnWidth: 150,
		 	  rowHeight: 20, 
		 	  contentBinding: 'TwSprout.lawController.arrangedObjects',
		 	  selectionBinding: 'TwSprout.lawController.selection', 
			  //selectionBindingDefault: 'SC.Binding.firstObject()',
		 	  exampleView: TwSprout.LawEntryViewTopLevel

	     	})
	  }),
	lawSecondLevelView: SC.ScrollView.design({
	      hasHorizontalScroller: NO,
	      layout: { top: 0, bottom: 0, left: 0, right: 0 },
	      backgroundColor: 'white',
	     	contentView: SC.GridView.design({
		 	  columnWidth: 250,
		 	  rowHeight: 200, 
		 	  contentBinding: 'TwSprout.lawController.arrangedObjects',
		 	  valueBinding: 'TwSprout.lawController.arrangedObjects',
		 	  selectionBinding: 'TwSprout.lawController.selection', 
		 	  exampleView: TwSprout.LawEntryViewSecondLevel
    
	     	})
	  }),
	lawFullTextView: SC.ScrollView.design({
	      hasHorizontalScroller: NO,
	      layout: { top: 0, bottom: 0, left: 0, right: 0 },
	      backgroundColor: 'white',
	     	contentView: SC.View.design({
		 	  contentBinding: 'TwSprout.lawController.selectedObject',
		 	  valueBinding: 'TwSprout.lawController.selectedObject',
		 	  //selectionBinding: 'TwSprout.lawController.selection', 
		 	  exampleView: TwSprout.LawEntryViewFullText
    
	     	})
	  })
});