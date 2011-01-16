// ==========================================================================
// Project:   Textwerk - aclView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk, Textwerk */


Textwerk.aclView = SC.View.extend(SC.ContentDisplay, {

    _mouse_x: 15,
    _mouse_y: 15,

    classNames: ['custom-view'],

    //click: 'Textwerk.documentDetailController.showDocumentDetailsPane(x,y)',
     displayProperties: ['content', 'isSelected'],

    contentDisplayProperties: 'content'.w(),

    render: function(context, firstTime) {

        var content = this.get('content');
        //console.log("content of me: " + SC.inspect(content));
        var isSelected = this.get('isSelected');
        var idx = 0;
		console.log("render called");
        if (content) {
            content.forEach(function(obj) {
                // for each obj in o
                //if (idx < 1000) {
                    //console.log(obj.get('guid'));
                    //console.log(idx);
					//context = context.setClass(classes);
			        context = context.begin('div').addClass('acl-paper').push(obj.get('guid').substring(0,1)).end();
			        //context = context.end();
                //}
                idx++;
            },
            this);
        }

        var standard = !isSelected;
        var selected = isSelected;
        var classes = {
            'standard': standard,
            'selected': selected
        };
        //var id = content.get('guid');
        //var isSelected = this.get('isSelected');
        //context = context.begin().addClass('searchResultsContainer');
 		//console.log("rendering Test");
        //context = context.setClass(classes);
        //context = context.begin('span').addClass('acl-paper').push('Test').end();
        //context = context.end();
        sc_super();
    },
    mouseDown: function(evt) {
        return NO;
    },
    mouseMoved: function(evt)
    {
        return NO;
    }
});