
/** @class

Custom view that renders the overview of a law entry

@extends SC.View
*/
TwSprout.LawEntryView = SC.View.extend(SC.ContentDisplay, {  
	
	contentBinding: 'TwSprout.lawController.results',

	classNames: ['custom-list-item-view'],

	displayProperties: 'isSelected'.w(), 

	contentDisplayProperties: 'guid title authors date pmid'.w(),

	render: function(context, firstTime) {

		var content = this.get('content');
		var id = content.get('guid');
		var title = content.get('title');
		var authors = content.get('authors');
		var date = content.get('date');
		var pmid = content.get('pmid');  

		var isSelected = this.get('isSelected');

		var standard = !isSelected;
		var selected = isSelected;
		var classes = { 'standard': standard, 'selected': selected };

		//context = context.begin().addClass('searchResultsContainer');
		context = context.setClass(classes);
		context = context.begin('p').addClass('item').addClass('name').push('%@ %@'.fmt('('+id+')',title)).end();
		//context = context.end(); // div.top

		//context = context.begin().addClass('bottom');
		context = context.begin('p').addClass('item').addClass('authors');
		context = context.begin('span').addClass('label').push('Authors:').end();
		context = context.begin('span').addClass('value').push(authors).end();
		context = context.end(); // p.item.company
		context = context.begin('p').addClass('item').addClass('date');
		context = context.begin('span').addClass('label').push('Date:').end();
		context = context.begin('span').addClass('value').push(date).end();
		context = context.end() // p.item.title  
		context = context.begin('p').addClass('item').addClass('pmid');
		context = context.begin('span').addClass('label').push('PMID:').end();
		context = context.begin('span').addClass('value').push('<a href="http://www.ncbi.nlm.nih.gov/pubmed/'+pmid+'">'+pmid+'</a>').end();
		context = context.end() // p.item.pmid
		//context = context.end() // div.searchResultsContainer

		sc_super();
	}
});