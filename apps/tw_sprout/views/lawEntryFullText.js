// ==========================================================================
// Project:   TwSprout
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

Custom view that renders the overview of a pubmed entry

@extends SC.View
*/
TwSprout.LawEntryViewFullText = SC.View.extend(SC.ContentDisplay, {  
	
	contentBinding: 'TwSprout.lawController.results',

	classNames: ['custom-list-item-view'],

	displayProperties: 'isSelected'.w(), 

	contentDisplayProperties: 'guid name description date doc_type'.w(),

	render: function(context, firstTime) {

		var content = this.get('content');
		var id = content.get('guid');
		var name = content.get('name');
		var description = content.get('description');
		var date = content.get('date');
		var doc_type = content.get('doc_type');  

		var isSelected = this.get('isSelected');

		var standard = !isSelected;
		var selected = isSelected;
		var classes = { 'standard': standard, 'selected': selected };

		//context = context.begin().addClass('searchResultsContainer');
		context = context.setClass(classes);
		context = context.begin('p').addClass('item').addClass('title').push('%@ %@'.fmt('('+id+')',name)).end();
		//context = context.end(); // div.top

		//context = context.begin().addClass('bottom');
		context = context.begin('p').addClass('item').addClass('authors');
		context = context.begin('span').addClass('label').push('description:').end();
		context = context.begin('span').addClass('value').push(description).end();
		context = context.end(); // p.item.company
		context = context.begin('p').addClass('item').addClass('date');
		context = context.begin('span').addClass('label').push('Date:').end();
		context = context.begin('span').addClass('fulltext').push(date).end();
		context = context.end(); // p.item.name  
		context = context.begin('p').addClass('item').addClass('pmid');
		context = context.begin('span').addClass('label').push('doc_type:').end();
		context = context.begin('span').addClass('value').push('<a href="http://www.ncbi.nlm.nih.gov/pubmed/'+doc_type+'">'+doc_type+'</a>').end();
		context = context.end(); // p.item.doc_type
		//context = context.end() // div.searchResultsContainer

		sc_super();
	}
});