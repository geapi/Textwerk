// ==========================================================================
// Project:   TextWerk
// ==========================================================================
/*globals TextWerk */

/** @class

Custom view that renders the overview of a pubmed entry

@extends SC.View
*/
sc_require('ext/delegates');

TextWerk.LawEntryView = SC.View.extend(SC.ContentDisplay, {
	
	_mouse_x: 15,
	_mouse_y: 15,

    classNames: ['custom-list-item-view'],
	
	//click: 'TextWerk.documentDetailController.showDocumentDetailsPane(x,y)',
	//backgroundColor: 'transparent',
    displayProperties: 'isSelected'.w(),
    contentDisplayProperties: 'guid name'.w(),

    render: function(context, firstTime) {

        var content = this.get('content');
        var isSelected = this.get('isSelected');

        var standard = !isSelected;
        var selected = isSelected;
        var classes = {
            'standard': standard,
            'selected': selected
        };

		//console.log("rendering item with context: "+ this.frame().x + " : " + this.frame().y);
		
        //context = context.begin().addClass('searchResultsContainer');
        /*if (isSelected) {
            this.renderSelected(context, firstTime, classes, content);
        }
        else {
            this.renderUnselected(context, firstTime, classes, content);
        }*/
		this.renderUnselected(context, firstTime, classes, content);

        sc_super();
    },
    mouseDown: function(evt) {
        var guid = this.get('content').get('guid');
        //console.log("got a mouse down with evt " + evt.pageX + ":" + evt.pageY);
        //console.log("got a mouse down with guid " + guid);
        if (guid>=0) {
            //console.log("got a mouse down with selection " + TextWerk.lawController.selectedObject);
			TextWerk.lawController.set('mouse_x', evt.pageX);
			TextWerk.lawController.set('mouse_y', evt.pageY);
			TextWerk.lawController.set('currentDetailView',this);
            //TextWerk.documentDetailController.showDocumentDetailsPane(x,y);
            return NO;
        }
        return NO;
    },
 	mouseMoved: function(evt)
   {
	var guid = this.get('content').get('guid');
	//console.log("got a mouse move with guid " + guid);
	//TextWerk.lawController.set('selectedObject',TextWerk.Law[guid]);
	//this.isSelected = true;
	return NO;
   },
    renderSelected: function(context, firstTime, classes, content) {
	
		
        var id = content.get('guid');
        id += 1;
        var name = content.get('name');
        var description = content.get('description')?content.get('description'):"n/a";
        var description_length = description.length;
		description = (description_length > 150) ? (description.substr(0,150)+"&hellip;") : description;
        var date = content.get('date')?content.get('date'):"n/a";
        var doc_type = content.get('doc_type');

        var isSelected = this.get('isSelected');


        //context = context.begin().addClass('searchResultsContainer');
        context = context.setClass(classes);
        context = context.begin('p').addClass('item').addClass('title').push('%@ %@'.fmt('(' + id + ')', name)).end();
        //context = context.end(); // div.top
        //context = context.begin().addClass('bottom');
        context = context.begin('p').addClass('item').addClass('authors');
        context = context.begin('span').addClass('label').push('description:').end();
        context = context.begin('span').addClass('value').push(description).end();
        context = context.end(); // p.item.company
        context = context.begin('p').addClass('item').addClass('date');
        context = context.begin('span').addClass('label').push('Date:').end();
        context = context.begin('span').addClass('value').push(date).end();
        context = context.end(); // p.item.name  
        context = context.begin('p').addClass('item').addClass('pmid');
        context = context.begin('span').addClass('label').push('doc_type:').end();
        context = context.begin('span').addClass('value').push('<a href="http://www.ncbi.nlm.nih.gov/pubmed/' + doc_type + '">' + doc_type + '</a>').end();
        context = context.end();
    },
    renderUnselected: function(context, firstTime, classes, content) {
        var id = content.get('id');
        //id = (id + 1);
        var name = content.get('name');
        context = context.setClass(classes);
        context = context.begin('p').addClass('item').addClass('title').push('%@ %@'.fmt('(' + id + ')', name)).end();
    }
});
