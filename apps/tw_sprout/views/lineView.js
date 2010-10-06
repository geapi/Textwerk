// ==========================================================================
// Project:   TextWerk.LineView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk, Sai */

/** @class

Custom view that renders line(s) between entries

@extends SC.View
*/
TextWerk.LineView = SC.View.extend({
    classNames: ['textwerk-line'],
    cr: '',
    //collectionRef: 'Testing',
    layout: {
        top: 30,
        left: 0,
        right: 15,
        bottom: 0
    },
    childViews: 'line'.w(),
    acceptsFirstResponder: YES,
    mouseDown: function(evt) {
        sc_super(); 
        console.log("mouse DOWN on CANVAS: " + this.get('cr'));
        var cv = this.get('cr'); 
        //cv.mouseDown(evt);
        return NO; 
    },
    mouseUp: function(evt) {
        sc_super();
        console.log("mouse UP on CANVAS: " + this.get('cr'));
        var cv = this.get('cr'); 
        //cv.mouseUp(evt);
        return NO;
    },
    line: Sai.CanvasView.design({
        acceptsFirstResponder: YES,
        layout: {
            left: 0,
            top: 0,
            right: 15,
            bottom: 0
        },
        childElements: 'line1 arrowHead'.w(),
        backgroundColor: 'transparent',
        line1: Sai.Path.create({
            stroke: 'green',
            strokeWidth: 4,
            path: 'M166,240 L830,360'
        }),

        arrowHead: Sai.Path.create({
            stroke: 'green',
            fill: 'green',
            strokeWidth: 4,
            cap: 'rounded',
            path: 'M828,375 l5,-30  20,20 z'
        }),
    })
});
