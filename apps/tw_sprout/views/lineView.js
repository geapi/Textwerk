// ==========================================================================
// Project:   TextWerk.LineView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

Custom view that renders the overview of a pubmed entry

@extends SC.View
*/
TextWerk.LineView = SC.View.design({
    classNames: ['path-sample'],
    layout: { top: 30, left: 0, right: 15, bottom: 0 },
    childViews: 'line'.w(),
acceptsFirstResponder: YES,
		mouseDown: function(evt) {
            sc_super(); // necessary to guarantee regular handling of keyDown events, 
            // want to avoid that this overwrite messes everything up
            console.log("got key event on top view for SVG: "+ evt.keyCode )
            if (evt.keyCode === 27) {
                // trigger the search after we've seen an "enter", seems to have hickups in FF
                pane.remove();
                return YES;
            } else {
                return NO;
            }
        },
    
    line: Sai.CanvasView.design({
	acceptsFirstResponder: YES,
      layout: { left: 0, top: 0, right: 15, bottom: 0 },
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
      })
    })
});