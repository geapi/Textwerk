// ==========================================================================
// Project:   TextWerk.aclPapersController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
TextWerk.aclPapersController = SC.ArrayController.create(
/** @scope TextWerk.aclPapersController.prototype */
 {

    content: null,
    selection: null,

    currentShowing: function() {
        var currentContent;
        var content = this.get('content');
        var counter = 0;
        var currentCollection = [];
		var upperBound = 10;
        if (content) {
            content.forEach(function(obj) {
                // for each obj in o
                if (counter < upperBound) {
                    //console.log(obj.get('guid'));
                    //console.log(idx);
                    //context = context.setClass(classes);
                    currentCollection[counter] = obj;
                    //context = context.end();
                }
                counter++;
            },
            this);
        }
        return currentCollection;
    }.property('content').cacheable()

});
