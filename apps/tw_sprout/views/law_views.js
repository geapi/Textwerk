// ==========================================================================
// Project:   TextWerk - views
// Copyright: ©2010 eco
// ==========================================================================
/*globals TextWerk */
sc_require('views/master_view');
sc_require('views/document_view');
sc_require('core');

TextWerk.lawViews = SC.Page.design({
    lawTopLevelView: TextWerk.MasterView.design({
        contentPath: 'TextWerk.lawController.arrangedObjects',
        //selectionPath: 'TextWerk.lawController.selection',
		selectionPath: 'TextWerk.documentCollectionsController.selection',
        //searchPath: 'myApp.myRecordsController.search',
        contentValueKey: 'name',
		//actOnSelect: YES,
	    //target: TextWerk.documentCollectionsController,
	    //action: 'changedCollection'
    
    
    }),
	//lawTopLevelView: SC.GridView.design({
	//            columnWidth: 150,
	//            rowHeight: 20,
	//            contentBinding: 'TextWerk.lawController.arrangedObjects',
	//            selectionBinding: 'TextWerk.lawController.selection',
	//			//valueBinding: '',
	//            //delegate: TextWerk.rowDelegate,
	//            //selectionBindingDefault: 'SC.Binding.firstObject()',
	//            exampleView: TextWerk.LawEntryView,
	//			render: function(context, firstTime){
	//				if(firstTime){
	//				//console.log('rendering collection container as '+ this);
	//				TextWerk.lawController.set('collectionViewRef',this);
	//				}
	//				sc_super();
	//			},
	//			//mouseDown:function(evt){
	//			//	sc_super();
	//			//	console.log("someboody called mouseDown on gridvuiew");
	//			//	return NO;
	//			//}
	//        }),
    lawSecondLevelView: SC.View.design({
        childViews: "canvas".w(),
        canvas: LinkIt.CanvasView.design( {
            layout: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            classNames: ['family-canvas'],
            contentBinding: SC.Binding.from('TextWerk.documentCollectionContentsController').oneWay(),
			selectionBinding: 'TextWerk.documentCollectionContentsController.selection',
            nodeViewDelegate: TextWerk.documentCollectionController,
			exampleView: TextWerk.DocumentView
            
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
