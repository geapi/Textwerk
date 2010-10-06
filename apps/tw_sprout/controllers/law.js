// ==========================================================================
// Project:   TextWerk.law
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
TextWerk.lawController = SC.ArrayController.create(
/** @scope TextWerk.law.prototype */
 {
    //contentBinding: 'TextWerk.lawController.selection',
    //contentBindingDefault: SC.Binding.firstObject(),
    searching: NO,
	selectedObject: null,
	mouse_x:15,
	mouse_y:15,
	currentDetailView: null,
	collectionViewRef: null,
	searchTermOverview: "",
	searchTermLaw: "",


    hightlight: function() {
        var content = this.get('content');
    },


    isSelectedChanged: function() {
        // console.log('just got selected:  '+ this.get('selection'));
        if (this.getPath('selection.firstObject')) {
            //console.log('just got selected:  ' + this.getPath('selection.firstObject').get('guid'));
            //this.get('id');
 			this.set('selectedObject',this.getPath('selection.firstObject') );
			//TextWerk.documentDetailController.showDocumentDetailsPane();
			TextWerk.documentDetailController.showPickerPanePointer(this.currentDetailView);
			//console.log("selected object: "+ this.get('selectedObject'));
            if (TextWerk.LAW_CONTENT_SECONDLEVEL.isFirstResponder) {
                extWerk.makeFirstResponder(TextWerk.LAW_CONTENT_TOPLEVEL);
            } else
            {
                TextWerk.makeFirstResponder(TextWerk.LAW_CONTENT_SECONDLEVEL);
            }
        }
    }.observes('selection'),

    arrangedObjects: function() {
        //alert(this.get('status'));
        //console.log(this.get('content'));
        return this.get('content');
    }.property('status').cacheable(),

	




});
