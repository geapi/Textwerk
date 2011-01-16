/**
 * The base document view.
 * @class Textwerk.DocumentView
 * @extends SC.View
 * @author Georg Apitz
 *
 * @version 0.1
 * @since 0.1
 */
 /*globals LinkIt, CoreTextwerk, Textwerk*/

Textwerk.NodeView = SC.View.extend(LinkIt.NodeView,  {
  layout: { top: 0, left: 0, width: 150, height: 200 },
  displayProperties: ['content', 'isSelected'],
  
  content: null,
  
  render: function(context){
    var c = this.get('content');
	context.addClass('document');
    sc_super();
    if (this.get("isSelected")) context.addClass("selected");
  },
  
  createChildViews: function(){
	//console.log("Creating Childviews");
    var childViews = [], contentView, titleLabel,titleView, yearView, venueView;
    var content = this.get('content');
    if(SC.none(content)) return;

      
    // ..........................................................
    // document
    // 

      var iconView = this.createChildView(
        SC.View.extend({
          classNames: ['icon'],
          content: content,
          layout: { centerY: 0, left: 5, width: 25, height: 25},
          render: function(context, firstTime){
            context = context.addClass('male');
            sc_super();
          }
        })
      );
      //childViews.push(iconView);

	titleLabel = this.createChildView(
        SC.LabelView.extend({
          classNames: ['name'],
          content: content,
          isEditable: YES,
          layout: { top: 10, left: 1, width: 30, height: 25},
          textAlign: SC.ALIGN_CENTER,
		escapeHTML: NO,
          value: "<b>Title:</b> "
        })
      );
     // childViews.push(titleLabel);
	titleView = this.createChildView(
        SC.LabelView.extend({
          classNames: ['aclTitle'],
          content: content,
          isEditable: YES,
          layout: { top: 10, left: 5, width: 140, height: 75},
          textAlign: SC.ALIGN_CENTER,
		  escapeHTML: YES,
          valueBinding: SC.binding('.title', content)
        })
      );
      childViews.push(titleView);
      // This is the content of the view
      contentView = this.createChildView(
        SC.LabelView.extend({
          classNames: ['author'],
          content: content,
          isEditable: YES,
          layout: { top: 100, centerX: 0, width: 125, height: 65},
          textAlign: SC.ALIGN_CENTER,
          valueBinding: SC.binding('.authors', content)
        })
      );
      childViews.push(contentView);
	  // year view
	 yearView = this.createChildView(
        SC.LabelView.extend({
          classNames: ['year'],
          content: content,
          isEditable: YES,
          layout: { top: 155, centerX: 0, width: 125, height: 25},
          textAlign: SC.ALIGN_CENTER,
          valueBinding: SC.binding('.year', content)
        })
      );
      childViews.push(yearView);
	// venue view
		venueView = this.createChildView(
	        SC.LabelView.extend({
	          classNames: ['venue'],
	          content: content,
	          isEditable: YES,
	          layout: { top: 170, centerX: 0, width: 125, height: 25},
	          textAlign: SC.ALIGN_CENTER,
	          valueBinding: SC.binding('.venue', content)
	        })
	      );
	      childViews.push(venueView);

		// Referrer Terminal
        this._term_cit = this.createChildView(
        SC.View.extend(LinkIt.Terminal, {
            classNames: ['citee-terminal'],
            layout: {
                left: 10,
                top: -5,
                width: 8,
                height: 8
            },
            linkStyle: {
                lineStyle: LinkIt.VERTICAL_CURVED,
                width: 3,
                color: '#A5C0DC',
                cap: LinkIt.ROUND,
				directionIndicator: LinkIt.FORWARD
            },
            node: content,
            terminal: 'cit',
            direction: LinkIt.INPUT_TERMINAL
        }));
        childViews.push(this._term_cit);

        // Citee Terminal
        this._term_ref = this.createChildView(
        SC.View.extend(LinkIt.Terminal, {
            classNames: ['referrer-terminal'],
            layout: {
                right: 10,
                bottom: -5,
                width: 8,
                height: 8
            },
            linkStyle: {
                lineStyle: LinkIt.VERTICAL_CURVED,
                width: 3,
                color: '#A5C0DC',
                cap: LinkIt.ROUND,
				directionIndicator: LinkIt.FORWARD
            },
            node: content,
            terminal: 'ref',
            direction: LinkIt.OUTPUT_TERMINAL,
			
        }));
        childViews.push(this._term_ref);

    
    


    this.set('childViews', childViews);
	//console.log("done with child views");
  },
  
  // ..........................................................
  // LINKIT Specific for the view
  // 
  /**
    Implements LinkIt.NodeView.terminalViewFor()
  */
  terminalViewFor: function(terminalKey) {
    return this['_term_' + terminalKey];
  }
});
