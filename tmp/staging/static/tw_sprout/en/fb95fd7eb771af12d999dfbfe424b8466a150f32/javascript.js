/* >>>>>>>>>> BEGIN bundle_info.js */
        ;(function() {
          var target_name = 'sproutcore/standard_theme' ;
          if (!SC.BUNDLE_INFO) throw "SC.BUNDLE_INFO is not defined!" ;
          if (SC.BUNDLE_INFO[target_name]) return ; 
          
          SC.BUNDLE_INFO[target_name] = {
            requires: ['sproutcore/empty_theme'],
            styles:   ['/static/sproutcore/standard_theme/en/52920dfdad7f0329367ed5692a2fc96881122edb/stylesheet-packed.css','/static/sproutcore/standard_theme/en/52920dfdad7f0329367ed5692a2fc96881122edb/stylesheet.css'],
            scripts:  ['/static/sproutcore/standard_theme/en/52920dfdad7f0329367ed5692a2fc96881122edb/javascript-packed.js']
          }
        })();

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   TwSprout
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
TwSprout = SC.Application.create(
  /** @scope TwSprout.prototype */ {

  NAMESPACE: 'TwSprout',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures)
  
  // TODO: Add global constants or singleton objects needed by your app here.

}) ;

/* >>>>>>>>>> BEGIN source/controllers/pubmed.js */
// ==========================================================================
// Project:   TwSprout.pubmedController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
TwSprout.pubmedController = SC.ArrayController.create(
/** @scope TwSprout.pubmedController.prototype */ {

  	resultcount: function() {
	    var len = this.get('length'), ret ;

	    if (len && len > 0) {
	      ret = len === 1 ? "1 result" : "%@ results".fmt(len);
	    } else ret = "No results";

	    return ret;
	  }.property('length').cacheable()

}) ;

/* >>>>>>>>>> BEGIN source/models/pubmed.js */
// ==========================================================================
// Project:   TwSprout.Pubmed
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
TwSprout.Pubmed = SC.Record.extend(
/** @scope TwSprout.Pubmed.prototype */ {

  // TODO: Add your own code here.

}) ;

/* >>>>>>>>>> BEGIN source/views/pubmed_entry.js */
// ==========================================================================
// Project:   TwSprout.PubmedEntryView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

/** @class

(Document Your View Here)

@extends SC.View
*/
TwSprout.PubmedEntryView = SC.View.extend(SC.ContentDisplay, {

	classNames: ['custom-list-item-view'],

	displayProperties: 'isSelected'.w(), 

	contentDisplayProperties: 'guid title authors date pmid'.w(),

	render: function(context, firstTime) {

		var content = this.get('content');
		var id = content.get('guid');
		var title = content.get('title');
		var authors = content.get('authors');
		var date = content.get('date');
		var pmid = content.get('pmid');  

		var isSelected = this.get('isSelected');

		var standard = !isSelected;
		var selected = isSelected;
		var classes = { 'standard': standard, 'selected': selected };

		//context = context.begin().addClass('searchResultsContainer');
		context = context.setClass(classes);
		context = context.begin('p').addClass('name').push('%@ %@'.fmt('('+id+')',title)).end();
		//context = context.end(); // div.top

		//context = context.begin().addClass('bottom');
		context = context.begin('p').addClass('item').addClass('company');
		context = context.begin('span').addClass('label').push('Authors:').end();
		context = context.begin('span').addClass('value').push(authors).end();
		context = context.end(); // p.item.company
		context = context.begin('p').addClass('item').addClass('date');
		context = context.begin('span').addClass('label').push('Date:').end();
		context = context.begin('span').addClass('value').push(date).end();
		context = context.end() // p.item.title  
		context = context.begin('p').addClass('item').addClass('date');
		context = context.begin('span').addClass('label').push('PMID:').end();
		context = context.begin('span').addClass('value').push('<a href="http://www.ncbi.nlm.nih.gov/pubmed/'+pmid+'">'+pmid+'</a>').end();
		context = context.end() // p.item.pmid
		//context = context.end() // div.searchResultsContainer

		arguments.callee.base.apply(this,arguments);
	}
});

/* >>>>>>>>>> BEGIN source/resources/main_page.js */
// ==========================================================================
// Project:   TwSprout - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

// This page describes the main user interface for your application.  
TwSprout.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
   	childViews: 'middleView topView bottomView'.w(),

	    topView: SC.ToolbarView.design({
	      layout: { top: 0, left: 0, right: 0, height: 36 }, 
		  childViews: 'labelView searchField searchButton'.w(),
	      anchorLocation: SC.ANCHOR_TOP,
	
		 labelView: SC.LabelView.design({
		        layout: { centerY: 0, height: 24, left: 8, width: 200 },
		        controlSize: SC.LARGE_CONTROL_SIZE,
		        fontWeight: SC.BOLD_WEIGHT,
		        value:   'PubMed TextWerk'
		      }),
		 searchField: SC.TextFieldView.design({
		        layout: { centerY: 0, height: 24, right: 120, width: 200 },
		        controlSize: SC.LARGE_CONTROL_SIZE,
		        fontWeight: SC.BOLD_WEIGHT,
		        value:   'type your search here'
		      }),  

		 searchButton: SC.ButtonView.design({
	        layout: { centerY: 0, height: 24, right: 12, width: 100 },
	        title:  "Search"
	      })
	    }),

	    middleView: SC.ScrollView.design({
	      hasHorizontalScroller: NO,
	      layout: { top: 36, bottom: 32, left: 0, right: 0 },
	      backgroundColor: 'white',

	      contentView: SC.GridView.design({
			columnWidth: 220,
			rowHeight: 200, 
			contentBinding: 'TwSprout.pubmedController.arrangedObjects',
			selectionBinding: 'TwSprout.pubmedController.selection', 
			exampleView: TwSprout.PubmedEntryView			
			//contentValueKey: "title",     
			//contentCheckboxKey: "isDone",
           
	      })
	    }),

	    bottomView: SC.ToolbarView.design({
	      layout: { bottom: 0, left: 0, right: 0, height: 32 },
		  childViews: 'summaryView'.w(),
	      anchorLocation: SC.ANCHOR_BOTTOM,
	
		  summaryView: SC.LabelView.design({
		        layout: { centerY: 0, height: 18, left: 20, right: 20 },
		        textAlign: SC.ALIGN_CENTER,

		        valueBinding: "TwSprout.pubmedController.resultcount"
		  })
	    })
	  })

});

/* >>>>>>>>>> BEGIN source/main.js */
// ==========================================================================
// Project:   TwSprout
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
TwSprout.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  TwSprout.getPath('mainPage.mainPane').append() ; 
  //TwSprout.server.preload(TwSprout.Pubmed.FIXTURES);

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: TwSprout.contactsController.set('content',TwSprout.contacts); 

	var query = SC.Query.local(TwSprout.Pubmed, { orderBy: 'guid,title' });
	var results = TwSprout.store.find(query);
	TwSprout.pubmedController.set('content', results);

} ;

function main() { TwSprout.main(); }

