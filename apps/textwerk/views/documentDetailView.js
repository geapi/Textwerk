// ==========================================================================
// Project:   Textwerk
// ==========================================================================
/*globals CoreTextwerk, Textwerk */

/** @class

Custom view that renders the overview of a pubmed entry

@extends SC.View
*/

Textwerk.documentDetailView = SC.View.extend(SC.ContentDisplay, {
	
	_mouse_x: 15,
	_mouse_y: 15,
	create: function(){},

    classNames: ['custom-list-item-view'],
	
	//click: 'Textwerk.documentDetailController.showDocumentDetailsPane(x,y)',

    displayProperties: 'isSelected'.w(),
 
    contentDisplayProperties: 'guid name'.w(),

	//childViews: "iconView".w(),
	//
	//iconView: SC.ImageView.design({
	//  //layout: { top: 0, right: 0, bottom: 0, left: 0 },
	//  valueBinding: 'icon',
	//  isVisibleBinding: '.parentView.isSelected'
	//}),

    render: function(context, firstTime) {

        var content = this.get('content');
        var isSelected = this.get('isSelected');

        var standard = !isSelected;
        var selected = isSelected;
        var classes = {
            'standard': standard,
            'selected': selected
        };
		if(isSelected){
			this.renderSelected(context, firstTime, classes, content);
		}else{
            this.renderUnselected(context, firstTime, classes, content);
		}	


        sc_super();
    },
    mouseDown: function(evt) {
        var guid = this.get('content').get('guid');
        //console.log("got a mouse down with evt " + evt.pageX + ":" + evt.pageY);
        //console.log("got a mouse down with guid " + guid);
        if (guid>=0) {
            //console.log("got a mouse down with selection " + Textwerk.lawController.selectedObject);
			this._mouse_x = evt.pageX;
			this._mouse_y = evt.pageY;
            //Textwerk.documentDetailController.showDocumentDetailsPane(x,y);
            return NO;
        }
        return NO;
    },
 	mouseMoved: function(evt)
   {
	var guid = this.get('content').get('guid');
	//console.log("got a mouse move with guid " + guid);
	//Textwerk.lawController.set('selectedObject',Textwerk.Law[guid]);
	//this.isSelected = true;
	return NO;
   },
    renderSelected: function(context, firstTime, classes, content) {
	
        var id = content.get('guid');
        id += 1;
        var title = content.get('title');
        var authors = content.get('author')?content.get('author'):"n/a";
        var description_length = authors.length;
		//description = (description_length > 150) ? (description.substr(0,200)+"&hellip;") : description;
        var year = content.get('year')?content.get('year'):"n/a";
        var venue = content.get('venue');

        var isSelected = this.get('isSelected');


        //context = context.begin().addClass('searchResultsContainer');
        context = context.setClass(classes);
        //context = context.begin('p').addClass('item').addClass('title').push('%@ %@'.fmt('(' + id + ')', name)).end();
        //context = context.end(); // div.top
        context = context.begin().addClass('detailView');
        context = context.begin('p').addClass('item').addClass('authors').push("authors: <br/>"+ authors);
        context = context.begin('span').addClass('label').push('<br/>title:').end();
        context = context.begin('span').addClass('value').push(title).end();
        context = context.end(); // p.item.company
        context = context.begin('p').addClass('item').addClass('date');
        context = context.begin('span').addClass('label').push('<br/>Year:<br/>').end();
        context = context.begin('span').addClass('value').push(year).end();
        context = context.end(); // p.item.name  
        context = context.begin('p').addClass('item').addClass('pmid');
        context = context.begin('span').addClass('label').push('<br/>venue: <br/>'+ venue).end();
       // context = context.begin('span').addClass('value').push('<a href="http://www.ncbi.nlm.nih.gov/pubmed/' + doc_type + '">' + doc_type + '</a>').end();
        context = context.end();
    },
    renderUnselected: function(context, firstTime, classes, content) {
        var id = content.get('guid');
        id = id + 1;
        var name = content.get('icon');
        context = context.setClass(classes);
		var icon = sc_static("images/document_icon");
       // context = context.push('<img src="'+icon+'"style="left: 144px; width: 16px; top: 0px; height: 18px">').end();
	   context = context.begin('img').addClass('label').push('M').end();
    }
});
