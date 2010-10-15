/**
 * The base document view.
 * @class TextWerk.NodeView
 * @extends SC.View
 * @author Georg Apitz
 *
 * @version 0.1
 * @since 0.1
 */
/*globals LinkIt TextWerk*/
sc_require('core');

TextWerk.DocumentView = SC.View.extend(SCUI.Cleanup, LinkIt.NodeView, {
	classNames: ['human'],
    layout: {
        top: 0,
        left: 0,
        width: 150,
        height: 45
    },
    displayProperties: ['content', 'isSelected'],

    content: null,

    render: function(context) {
        var c = this.get('content');
        context.addClass('document');
        sc_super();
        if (this.get("isSelected")) context.addClass("selected");
		SC.Logger.log("in render");
    },

    createChildViews: function() {
	 SC.Logger.log("in create child views");
        var childViews = [],
        contentView;
        var content = this.get('content');
        if (SC.none(content)) return;

        // ..........................................................
        // document
        // 
        //var isMale = content.get('isMale');

        var iconView = this.createChildView(
        SC.View.extend({
            classNames: ['icon'],
            content: content,
            layout: {
                centerY: 0,
                left: 5,
                width: 25,
                height: 25
            },
            render: function(context, firstTime) {
                context.addClass('document');
                sc_super();
            }
        }));
        childViews.push(iconView);

        // This is the content of the view
        contentView = this.createChildView(
        SC.LabelView.extend({
            classNames: ['name'],
            content: content,
            isEditable: YES,
            layout: {
                centerY: 0,
                centerX: 0,
                width: 125,
                height: 25
            },
            textAlign: SC.ALIGN_CENTER,
            valueBinding: SC.binding('.name', content)
        }));
        childViews.push(contentView);

        // Referrer Terminal
        this._term_cit = this.createChildView(
        SC.View.extend(LinkIt.Terminal, {
            classNames: ['father-terminal'],
            layout: {
                left: 40,
                top: -5,
                width: 10,
                height: 10
            },
            linkStyle: {
                lineStyle: LinkIt.STRAIGHT,
                width: 3,
                color: '#A5C0DC',
                cap: LinkIt.ROUND
            },
            node: content,
            terminal: 'cit',
            direction: LinkIt.INPUT_TERMINAL
        }));
        childViews.push(this._term_cit);

        // Citee Terminal
        this._term_ref = this.createChildView(
        SC.View.extend(LinkIt.Terminal, {
            classNames: ['mother-terminal'],
            layout: {
                right: 40,
                top: -5,
                width: 10,
                height: 10
            },
            linkStyle: {
                lineStyle: LinkIt.STRAIGHT,
                width: 3,
                color: '#E08CDF',
                cap: LinkIt.ROUND
            },
            node: content,
            terminal: 'ref',
            direction: LinkIt.INPUT_TERMINAL
        }));
        childViews.push(this._term_ref);

        this.set('childViews', childViews);
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
