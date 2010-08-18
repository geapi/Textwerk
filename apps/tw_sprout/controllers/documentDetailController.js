// ==========================================================================
// TextWerk.DocumentDetailController
// ==========================================================================
/*globals TextWerk */

sc_require('core');

/** @class

  (Document Your View Here)

  @extends SC.Object
  @author    Georg Apitz
  @version 0.1
  @static
*/
TextWerk.documentDetailController = SC.Object.create(
/** @scope TextWerk.documentDetailController */
{
    pane: null,
	showPickerPanePointer: function(view) {
	    var pane = SC.PickerPane.create({
	      layout: { width: 200, height: 250 },
		  acceptsFirstResponder: YES,
		  keyDown: function(evt) {
              sc_super(); // necessary to guarantee regular handling of keyDown events, 
              // want to avoid that this overwrite messes everything up
              //console.log("got key event on panel: "+ evt.keyCode )
              if (evt.keyCode === 27) {
                  // trigger the search after we've seen an "enter", seems to have hickups in FF
                  pane.remove();
                  return YES;
              } else {
                  return NO;
              }
          },
	      contentView:	SC.View.extend({
              layout: {
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0
              },
			
              
              childViews: 'labelView buttonView'.w(),

              labelView: SC.CollectionView.extend({
                  //acceptsFirstResponder: YES,
                  layout: {
                      top: 15,
                      height: 180,
                      left: 10,
                      right: 0,
                      width: 180
                  },
                  textAlign: SC.ALIGN_CENTER,
                  controlSize: SC.LARGE_CONTROL_SIZE,
                  contentBinding: 'TextWerk.lawController.selectedObject',
                  valueBinding: 'TextWerk.lawController.selectedObject',
                  value: TextWerk.lawController.selectedObject,
                  exampleView: TextWerk.documentDetailView

              }),

              buttonView: SC.ButtonView.extend({
                  layout: {
                      width: 80,
                      bottom: 20,
                      height: 24,
                      centerX: 0
                  },
                  title: "Hide",
                  action: "hidePane",
                  target: "TextWerk.documentDetailController"
              })
          })
	    });
	    
	    //pane.popup(view, SC.PICKER_POINTER, [3,0,1,2,2]);
	    this.set('pane', pane);
		pane.popup(view);
		//pane.popup(view, SC.PICKER_FIXED);
	    this.pane.becomeFirstResponder();
		
	  },
    showDocumentDetailsPane: function(x, y) {
        //console.log("trying to show detail pane with "+ TextWerk.lawController.selectedObject);
        //this.makeFirstResponder();
        var pane = SC.PanelPane.create({
            layout: {
                width: 200,
                height: 250,
                left: TextWerk.lawController.get('mouse_x'),
                top: TextWerk.lawController.get('mouse_y')
            },
            
            acceptsFirstResponder: YES,
            contentView: SC.View.extend({
                layout: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                childViews: 'labelView buttonView'.w(),

                labelView: SC.CollectionView.extend({
                    //acceptsFirstResponder: YES,
                    layout: {
                        top: 15,
                        height: 180,
                        left: 10,
                        right: 0,
                        width: 180
                    },
                    textAlign: SC.ALIGN_CENTER,
                    controlSize: SC.LARGE_CONTROL_SIZE,
                    contentBinding: 'TextWerk.lawController.selectedObject',
                    valueBinding: 'TextWerk.lawController.selectedObject',
                    value: TextWerk.lawController.selectedObject,
                    exampleView: TextWerk.documentDetailView

                }),

                buttonView: SC.ButtonView.extend({
                    layout: {
                        width: 80,
                        bottom: 20,
                        height: 24,
                        centerX: 0
                    },
                    title: "Hide",
                    action: "remove",
                    target: "TextWerk.documentDetailController.pane"
                })
            })
        });
        pane.append();
        this.set('pane', pane);
        this.pane.becomeFirstResponder();
    },
    hidePane: function() {
        this.pane.remove();
    }
});
