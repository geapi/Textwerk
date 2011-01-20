/**
 * User: geapi
 * Date: Jan 17, 2011
 * Time: 7:51:28 PM
 */
/*globals CoreTextwerk, Textwerk, SCUI, Papercube */

/** @class

        Custom view that renders the overview of a pubmed entry

 @extends SC.View
 */
Textwerk.dashboardPage = SC.Page.design({
    dashboard: SC.View.design({
        childViews: 'yearLabel yearSelector authorsLabel authorsSelector venuesLabel venuesSelector affiliationsLabel affiliationsSelector gridView'.w(),

        yearLabel: SC.LabelView.design({
            classNames: ['categoryLabel'],
            layout: {top:10,left:10,height:25,width:250},
            valueBinding: SC.Binding.transform(function(value, binding) {
                return "Years: %@".fmt(value);
            }).from('Textwerk.collectionsController.length')

        }),
        yearSelector: SC.SelectFieldView.design({
            classNames:['categoryList'],
            layout: {top:35,left:10,height:25,width:200},
            objectsBinding: "Textwerk.collectionsController",
            valueBinding: "Textwerk.collectionsController.selected", // this is used to get the value change observed
            nameKey: 'nameAndCount',
            valueKey:'id' // if not set the whole object becomes the value, very handy
        }),

        authorsLabel: SC.LabelView.design({
            classNames: ['categoryLabel'],
            layout: {top:10,left:250,height:25,width:250},
            valueBinding: SC.Binding.transform(function(value, binding) {
                return "Authors: %@".fmt(value);
            }).from('Textwerk.authorsController.length')

        }),
        authorsSelector: SC.SelectFieldView.design({
            classNames:['categoryList'],
            layout: {top:35,left:250,height:25,width:200},
            objectsBinding: "Textwerk.authorsController.content",
            nameKey: 'name',
            valueKey:'name'
        }),

        venuesLabel: SC.LabelView.design({
            classNames: ['categoryLabel'],
            layout: {top:10,left:510,height:25,width:250},
            valueBinding: SC.Binding.transform(function(value, binding) {
                return "Venues: %@".fmt(value);
            }).from('Textwerk.venuesController.length')

        }),
        venuesSelector: SC.SelectFieldView.design({
            classNames:['categoryList'],
            layout: {top:35,left:510,height:25,width:200},
            objectsBinding: "Textwerk.venuesController.content",
            nameKey: 'name',
            valueKey:'name'
        }),
        affiliationsLabel: SC.LabelView.design({
            classNames: ['categoryLabel'],
            layout: {top:10,left:760,height:25,width:250},
            valueBinding: SC.Binding.transform(function(value, binding) {
                return "Affiliations: %@".fmt(value);
            }).from('Textwerk.affiliationsController.length')

        }),
        affiliationsSelector: SC.SelectFieldView.design({
            classNames:['categoryList'],
            layout: {top:35,left:760,height:25,width:200},
            objectsBinding: "Textwerk.affiliationsController.content",
            nameKey: 'name',
            valueKey:'name'
        }),
        xAxisView: SC.View.design({

        }),
        gridView: SC.ScrollView.design({
            layout:{top:70, left: 0, right:0, bottom: 35},
            backgroundColor: 'white',
            hasHorizontalScroller: NO,
            contentView: SC.GridView.design({
                contentValueKey: 'id',
                contentBinding: SC.Binding.from('Textwerk.collectionContentController').oneWay(),
                canEditContent: YES,
                canReorderContent: YES//,
                //selectionBinding: 'SampleControls.filesController.selection'
                // selectOnMouseDown: YES,
                // canReorderContent: YES
            })
        }),

        //       SC.GridView.design({
        //   layout:{top:70, left: 0, right:0, bottom: 35},
        //   columnWidth: 150,
        //   rowHeight: 20,
        //   backgroundColor:'transparent',
        //   classNames: ['textwerk-grid'],
        //   contentBinding: 'Textwerk.collectionsController.selection',
        //   selectionBinding: 'Textwerk.collectionController.selection',
        //   exampleView: SC.LabelView,
        //   //valueBinding: '',
        //   //delegate: TextWerk.rowDelegate,
        //   //selectionBindingDefault: 'SC.Binding.firstObject()',
        //   //canvasRef: cRef,
        //   //exampleView: TextWerk.LawEntryView,
        //   //contentValueKey: this.get('contentValueKey'),
        //   //contentBinding: this.get('contentPath'),
        //   //selectionBinding: this.get('selectionPath'),
        //   //actOnSelect: YES,
        //   //target: TextWerk.documentCollectionsController,
        //   //action: 'changedCollection',
        //   mouseDown:function(evt) {
        //       sc_super();
        //       //console.log("mouse down on grid with: "+this.get('canvasRef'));
        //       var cv = this.get('canvasRef');
        //       cv.mouseDown(evt);
        //       return NO;
        //   }
        //),
        xAxisView: SC.View.design({

        })
    })

});