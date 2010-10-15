// ==========================================================================
// Project:   TextWerk - views
// Copyright: ©2010eco
// ==========================================================================
/*globals TextWerk */
sc_require('views/master_view');
sc_require('views/document_view');

TextWerk.lawViews = SC.Page.design({
    lawTopLevelView: TextWerk.MasterView.design({
        contentPath: 'TextWerk.lawController.arrangedObjects',
        selectionPath: 'TextWerk.lawController.selection',
        //searchPath: 'myApp.myRecordsController.search',
        contentValueKey: 'name'

    }),
    lawSecondLevelView: SC.View.design({
        childViews: "master canvas".w(),
        master: SC.ListView.design({
            classNames: ['master-list'],
            layout: {
                left: 0,
                top: 56,
                width: 259,
                bottom: 36
            },
            rowHeight: 43,
            rowSpacing: 2,
            //exampleView: TextWerk.FamilyItemView,
            selectionBinding: 'TextWerk.documentCollectionsController.selection',
            contentBinding: 'TextWerk.documentCollectionsController',
            contentValueKey: 'name',
            actOnSelect: YES,
            target: TextWerk.documentCollectionsController,
            action: 'changedCollection'
        }),
        canvas: LinkIt.CanvasView.design(SCUI.Cleanup, {
            layout: {
                left: 259,
                right: 0,
                top: 56,
                bottom: 0
            },
            classNames: ['family-canvas'],
            contentBinding: SC.Binding.from('TextWerk.documentCollectionContentsController').oneWay(),
            selectionBinding: 'TextWerk.documentCollectionContentsController.selection',
			exampleView: TextWerk.DocumentView,
            nodeViewDelegate: TextWerk.documentCollectionController
            
        })
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
