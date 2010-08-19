// ==========================================================================
// Project:   TextWerk.PubmedEntryView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

Custom view that renders the overview of a pubmed entry

@extends SC.View
*/
TextWerk.GraphView = Flot.GraphView.design({
    layout: { left: 0, top:46, height: 200, right: 10 } ,
	backgroundColor: 'transparent',
	classNames: ['graph-view'],
    data: [
      SC.Object.create({label: 'set1', data:[[0,0], [1, 3], [2, 4]]})
    ] ,
    options: SC.Object.create({

      // your options here
    })
  });