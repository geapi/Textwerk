// ==========================================================================
// Project:   TextWerk - views
// Copyright: ©2010 
// ==========================================================================
/*globals TextWerk */
sc_require('views/lawEntryView');
sc_require('ext/delegates');
sc_require('views/lineView');

TextWerk.lawViews = SC.Page.design({
    lawTopLevelView: SC.View.design({
        childViews: 'contentView graphView'.w(),
        hasHorizontalScroller: NO,
        layout: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        backgroundColor: 'white',
		graphView: TextWerk.LineView,
        contentView: SC.GridView.design({
            columnWidth: 150,
            rowHeight: 20,
            contentBinding: 'TextWerk.lawController.arrangedObjects',
            selectionBinding: 'TextWerk.lawController.selection',
            //delegate: TextWerk.rowDelegate,
            //selectionBindingDefault: 'SC.Binding.firstObject()',
            exampleView: TextWerk.LawEntryView

        }), 
		//contentView.makeFirstResponder()
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
