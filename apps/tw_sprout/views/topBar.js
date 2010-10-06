// ==========================================================================
// Project:   TextWerk - topView
// Copyright: ©2010 Apple, Inc.
// ==========================================================================
/*globals TextWerk */

TextWerk.topBar = SC.ToolbarView.design({
    layout: {
        top: 0,
        left: 0,
        right: 0,
        height: 45
    },
    childViews: 'labelView taglineView searchedTerm loadingImage searchField searchButton'.w(),
    anchorLocation: SC.ANCHOR_TOP,

    labelView: SC.LabelView.design({
        layout: {
            centerY: 0,
            height: 24,
            left: 8,
            width: 200,
            top: 5
        },
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        value: 'TextWerk'
    }),
    taglineView: SC.LabelView.design({
        layout: {
            centerY: 0,
            height: 24,
            left: 8,
            width: 300,
            top: 25
        },
        controlSize: SC.SMALL_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        value: 'visualizing indicators of influence (law corpus)'
    }),
    searchedTerm: SC.LabelView.design({
        layout: {
            centerY: 0,
            height: 18,
            left: 200,
            right: 200,
            width: 700
        },
        textAlign: SC.ALIGN_CENTER,
        valueBinding: 'TextWerk.lawController.searchTermOverviewL',
        contentBinding: 'TextWerk.lawController.searchTermOverviewL'

    }),
    loadingImage: SC.ImageView.design({
        layout: {
            top: 14,
            height: 16,
            right: 350,
            width: 16
        },
        value: sc_static('images/loading'),
        useImageCache: NO,
        isVisibleBinding: 'TextWerk.lawController.searching'
    }),
    searchField: SC.TextFieldView.design({
        layout: {
            centerY: 0,
            height: 24,
            right: 120,
            width: 200
        },
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        hint: 'type your search here',
        valueBinding: 'TextWerk.lawController.searchTermLaw',
        target: "TextWerk.lawController",
        //action: "newSearch",
        keyDown: function(evt) {
            sc_super(); // necessary to guarantee regular handling of keyDown events, 
            // want to avoid that this overwrite messes everything up
            if (evt.charCode === 13) {
                // trigger the search after we've seen an "enter", seems to have hickups in FF
                TextWerk.lawController.searchPubmed();
                return YES;
            } else {
                return NO;
            }
        }
    }),

    searchButton: SC.ButtonView.design({
        layout: {
            centerY: 0,
            height: 24,
            right: 12,
            width: 100
        },
        title: "Search",
        target: "TextWerk.lawController",
        action: "searchPubmed"
    })
});
