/**
 * User: geapi
 * Date: Jan 22, 2011
 * Time: 2:49:40 PM
 */
/*globals CoreTextwerk, Textwerk */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Textwerk.documentController = SC.ObjectController.create(
/** @scope Textwerk.documentController.prototype */ {
       selection: null,
    _selectionChanged: function(){
        //console.log('selection changed to: '+this.get('selection'));
    }.observes('selection'),
    deselect: function(){
        //console.log('closing detail view');
        Textwerk.collectionContentController.selectObject();
    }

}) ;
