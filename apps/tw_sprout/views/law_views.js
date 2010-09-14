// ==========================================================================
// Project:   TextWerk - views
// Copyright: ©2010eco
// ==========================================================================
/*globals TextWerk */
sc_require('views/lawEntryView');
sc_require('ext/delegates');
sc_require('views/lineView');
sc_require('views/master_view');

TextWerk.lawViews = SC.Page.design({
    lawTopLevelView: TextWerk.MasterView.design({
	    contentPath: 'TextWerk.lawController.arrangedObjects',
        selectionPath: 'TextWerk.lawController.selection',
		//searchPath: 'myApp.myRecordsController.search',
		contentValueKey: 'name'
	
	}),
    lawFullTextView: SC.ScrollView.design({
        hasHorizontalScroller: NO,
        layout: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        backgroundColor: 'white',
        contentView: SC.View.design({
            contentBinding: 'TextWerk.lawController.selectedObject',
            valueBinding: 'TextWerk.lawController.selectedObject',
            //selectionBinding: 'TextWerk.lawController.selection', 
            exampleView: TextWerk.LawEntryViewFullText

        })
    })
});
