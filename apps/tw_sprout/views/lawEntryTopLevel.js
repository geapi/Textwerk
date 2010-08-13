// ==========================================================================
// Project:   TwSprout
// ==========================================================================
/*globals TwSprout */

/** @class

Custom view that renders the overview of a pubmed entry

@extends SC.View
*/
TwSprout.LawEntryViewTopLevel = SC.View.extend(SC.ContentDisplay, {  
	
	classNames: ['custom-list-item-view'],

	displayProperties: 'isSelected'.w(), 

	contentDisplayProperties: 'guid name'.w(),

	render: function(context, firstTime) {

		var content = this.get('content');
		var id = content.get('guid');
		id = id +1;
		var name = content.get('name');
		//var description = content.get('description');
		//var date = content.get('date');
		//var doc_type = content.get('doc_type');  

		var isSelected = this.get('isSelected');
		//if(!firstTime) console.log("is selected?: "+ isSelected);

		var standard = !isSelected;
		var selected = isSelected;
		var classes = { 'standard': standard, 'selected': selected };

		//context = context.begin().addClass('searchResultsContainer');
		context = context.setClass(classes);
		context = context.begin('p').addClass('item').addClass('title').push('%@ %@'.fmt('('+id+')',name)).end();

		sc_super();
	}
});