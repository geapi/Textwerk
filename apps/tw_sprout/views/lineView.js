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
    layout: { top: 30, left: 0, right: 0, bottom: 0 },
    childViews: 'line'.w(),
    
    line: Sai.CanvasView.design({
      layout: { left: 10, top: 20, height: 200, width: 310 },
      childElements: 'line1 line2'.w(),
      backgroundColor: 'transparent',
      line1: Sai.Path.create({
        stroke: 'green',
        strokeWidth: 5,
        path: 'M10,10 L300,100'
      }),
      
      line2: Sai.Path.create({
        stroke: 'red',
        strokeWidth: 5,
        path: 'M10,190 l290,-90'
      })
    })
});