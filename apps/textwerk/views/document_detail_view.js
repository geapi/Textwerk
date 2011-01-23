// ==========================================================================
// Project:   Textwerk
// ==========================================================================
/*globals CoreTextwerk, Textwerk */

/** @class

        Custom view that renders the overview of a document entry

 @extends SC.View
 */

Textwerk.documentDetailView = SC.View.extend(SC.ContentDisplay, {

    _mouse_x: 15,
    _mouse_y: 15,
    _oldX: 15,
    _oldY: 15,
    create: function() {
    },

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
        if (isSelected) {
            this.renderSelected(context, firstTime, classes, content);
        } else {
            //console.log('trying to render unselected');
            this.renderUnselected(context, firstTime, classes, content);
        }


        sc_super();
    },

    mouseDown: function(evt) {
        var guid = this.get('content').get('guid');
        //console.log("got a mouse down with evt " + evt.pageX + ":" + evt.pageY);
        //console.log("got a mouse down with guid " + guid);
        if (guid >= 0) {
            //console.log("got a mouse down with selection " + Textwerk.lawController.selectedObject);
            this._mouse_x = evt.pageX;
            this._mouse_y = evt.pageY;
            //Textwerk.documentDetailController.showDocumentDetailsPane(x,y);
        }
        //sc_super();
        return NO;
    },
    mouseMoved: function(evt) {
        sc_super();
        var guid = this.get('content').get('guid');
        //console.log("got a mouse move with guid " + guid);
        //Textwerk.lawController.set('selectedObject',Textwerk.Law[guid]);
        //this.isSelected = true;
        return NO;
    },
    renderSelected: function(context, firstTime, classes, content) {

        if (firstTime) {
        }
        var layout = this.get('layout');
        var position = {
            'x': layout.left,
            'y': layout.top,
            'width': 40,
            'height': 40
        }
        var panel = {
            'x': position.x,
            'y': position.y,
            'width': 200,
            'height': 200
        }

        var newPosition = Textwerk.helper.computePosition(panel, position);

        console.log('position top ' + position.x + " " + position.y);
        console.log('new position top ' + newPosition.x + " " + newPosition.y);
        var id = content.get('guid');
        id += 1;
        var title = content.get('title');
        var authors = content.get('authors') ? content.get('authors') : "n/a";
        var description_length = authors.length;
        //description = (description_length > 150) ? (description.substr(0,200)+"&hellip;") : description;
        var year = content.get('year') ? content.get('year') : "n/a";
        var venue = content.get('venue');

        var isSelected = this.get('isSelected');


        //context = context.begin().addClass('searchResultsContainer');
        context = context.setClass(classes);
        //context = context.begin('p').addClass('item').addClass('title').push('%@ %@'.fmt('(' + id + ')', name)).end();
        //context = context.end(); // div.top
        // SC.$(\'.selected\').removeClass(\'selected\').addClass(\'standard\');
        context = context.begin().addClass('detailView');
        context = context.push('<a href="javascript: void(0);" class="closeButton" onclick="Textwerk.documentController.deselect();">X</a>');
        context = context.begin('p').addClass('item').addClass('authors').push("<strong>authors</strong>:" + authors);
        context = context.begin('span').addClass('label').push('<br/>title:').end();
        context = context.begin('span').addClass('value').push(title).end();
        context = context.end(); // p.item.company
        context = context.begin('p').addClass('item').addClass('date');
        context = context.begin('span').addClass('label').push('<br/>Year:<br/>').end();
        context = context.begin('span').addClass('value').push(year).end();
        context = context.end(); // p.item.name
        context = context.begin('p').addClass('item').addClass('pmid');
        context = context.begin('span').addClass('label').push('<br/>venue: <br/>' + venue).end();
        // context = context.begin('span').addClass('value').push('<a href="http://www.ncbi.nlm.nih.gov/pubmed/' + doc_type + '">' + doc_type + '</a>').end();
        context = context.end();

        if (newPosition.x != position.x || newPosition.y != position.y) {
            this._oldX = position.x;
            this._oldY = position.y;
            this.adjust({ left: newPosition.x, top: newPosition.y });
            this.updateLayout();
        } else {
            this._oldX = -1;
        }

    },
    renderUnselected: function(context, firstTime, classes, content) {
        console.log('rendering unselected');
        //this.updateLayout();
        var layout = this.get('layout');
        if (firstTime) {
        }
        else {}
        if (this._oldX != -1) {
            this.adjust({left: this._oldX, top: this._oldY });
            this.updateLayout();
        }

        var id = content.get('guid');
        id = id + 1;
        var name = content.get('icon');
        context = context.setClass(classes);
        var icon = sc_static("images/document_icon");
        context = context.push('<img src="%@" style="left: 144px; width: 16px; top: 0px; height: 18px">'.fmt(icon));
        //context = context.begin('img').addClass('label').push('M').end();
    }
});
