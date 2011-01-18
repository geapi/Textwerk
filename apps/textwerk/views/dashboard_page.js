/**
 * User: geapi
 * Date: Jan 17, 2011
 * Time: 7:51:28 PM
 */
/*globals CoreTextwerk, Textwerk, SCUI */

/** @class

        Custom view that renders the overview of a pubmed entry

 @extends SC.View
 */
Textwerk.dashboardPage = SC.Page.design({
    dashboard: SC.View.design({
        childViews: 'yearLabel yearSelector'.w(),
        yearLabel: SC.LabelView.design({
            classNames: ['categoryLabel'],
            layout: {top:10,left:10,height:25,width:200},
            valueBinding: SC.Binding.transform(function(value, binding) {
                return "Years: %@".fmt(value);
            }).from('Textwerk.collectionsController.length')

        }),
        yearSelector: SC.SelectFieldView.design({
            layout: {top:35,left:10,height:25,width:200},
            objectsBinding: "Textwerk.collectionsController.content",
            //valueBinding: "Textwerk",
            nameKey: 'nameAndCount',
            valueKey:'nameAndCount'
        })
    })

});