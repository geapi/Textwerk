// ==========================================================================
// Project:   TwSprout.law
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
TwSprout.lawController = SC.ArrayController.create(
/** @scope TwSprout.law.prototype */
 {
    //contentBinding: 'TwSprout.lawController.selection',
    //contentBindingDefault: SC.Binding.firstObject(),
    searching: NO,


    hightlight: function() {
        var content = this.get('content');
    },


    isSelectedChanged: function() {
        // console.log('just got selected:  '+ this.get('selection'));
        if (this.getPath('selection.firstObject')) {
            //console.log('just got selected:  ' + this.getPath('selection.firstObject').get('guid'));
            //this.get('id');
            if (TwSprout.LAW_CONTENT_SECONDLEVEL.isFirstResponder) {
                TwSprout.makeFirstResponder(TwSprout.LAW_CONTENT_TOPLEVEL);
            } else
            {
                TwSprout.makeFirstResponder(TwSprout.LAW_CONTENT_SECONDLEVEL);
            }
        }
    }.observes('selection'),

    arrangedObjects: function() {
        //alert(this.get('status'));
        //console.log(this.get('content'));
        return this.get('content');
    }.property('status').cacheable(),




});
