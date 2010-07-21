/* >>>>>>>>>> BEGIN source/core.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// ========================================================================


/** Default namespace for designer-specific classes */
SC.Designer = SC.Object.extend({
  
});

/* >>>>>>>>>> BEGIN source/coders/object.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

/**

  Generic base class to encode a view hierarchy.  ViewCoders are used to 
  collect the properties that may be included in a view design and then to 
  serialize that design to a JavaScript string that can be evaled.  
  
  To encode a view with a ViewCoder, simply call SC.ViewCoder.encode(view).
  Most of the time, however, you will not initiate coding directly but instead
  work with the coder while designing an SC.DesignerView subclass.

  h2. Using a Coder

  When you are passed an instance of a coder, you can simply write attributes
  into the coder using one of the many encoding methods defined on the view.
  Encoding methods are defined for most primitive view types.
  
    coder.string("firstName" , "Charles").string('lastName', 'Jolley');
  
  @extends SC.Object
*/
SC.ObjectCoder = SC.Object.extend({
  
  // ..........................................................
  // PROPERTIES
  // 
  
  /** The className used to emit the design. */
  className: 'SC.Object',
  
  /** 
    The method to be used to create the class or object. 
  */
  extendMethodName: 'extend',
  
  /** 
    The default encoding method.  If an object defines this method, then a new
    coder will be created to encode that object.
  */
  encodeMethodName: 'encode',
  
  /** 
    The attributes that will be emitted.  The values all must be strings. Use 
    one of the encoding methods defined below to actually encode attributes.
  */
  attributes: null,
  
  // ..........................................................
  // ENCODING METHODS
  // 
  // Call these methods to encode various types of attributes.  They all take
  // the same basic params: (key, value)...

  /**
    Utility method transforms the passed value with the passed function.  
    Handles both Arrays and individual items.
  */
  transform: function(val, func) {
    
    // for an array, transform each value with the func and then return a
    // combined array.
    if (SC.typeOf(val) === SC.T_ARRAY) {
      val = val.map(function(x) { return this.transform(x, func); }, this);
      val = '['+val+']';
      
    // otherwise, just call transform function on the value
    } else {
      val = func.call(this, val);
    }
    return val;
  },
  
  /**
    Encodes a string of raw JavaScript.  This is the most primitive method. 
    You are expected to prep the value yourself.  You can pass an array to
    this or any other method and it will be encoded as a full array.

    This method also automatically handles null and undefined values.  Null
    values are included in the output.  Undefined values are ignored.
    
    @param key {String} the key to set
    @param val {String} the JavaScript
    @param transform {Function} optional transform function to apply to val
    @returns {SC.ObjectCoder} receiver
  */
  js: function(key, val, transform) {
    
    // normalize
    if (val===undefined) { val=key; key = undefined; }
    val = this.transform(val, function(x) {
      return (x===null) ? "null" : transform ? transform.call(this, x) : x ;
    });
    
    // save if needed.  Undefined values are ignored
    if (key !== undefined && (val !== undefined)) {
      this.attributes[key] = val;
      return this ;
    } else return val ;
  },

  /**
    Encodes a string, wrapping it in quotes.
    
    @param key {String} the key to set
    @param val {String} the value
    @returns {SC.ObjectCoder} receiver
  */
  string: function(key, val) {
    return this.js(key, val, function(x) {
      return '"' + x.replace(/"/g, '\\"') + '"' ;
    });
  },
  
  /**
    Encodes a number, wrapping it in quotes.
    
    @param key {String} the key to set
    @param val {Number} the value
    @returns {SC.ObjectCoder} receiver
  */
  number: function(key, val) {
    return this.js(key, val, function(x) { return x.toString(); });
  },
  
  /**
    Encodes a bool, mapped as YES or NO
    
    @param key {String} the key to set
    @param val {Boolean} the value
    @returns {SC.ObjectCoder} receiver
  */
  bool: function(key, val) {
    return this.js(key, val, function(x) { return x ? "YES" : "NO"; });
  },

  /**
    Encodes an object.  This will do its best to autodetect the type of the
    object.  You can pass an optional processing function that will be used 
    on object members before processing to allow you to normalize.  The 
    method signature must be:
    
      function convert(value, rootObject, key);
      
    The rootObject and key will be set to give you the context in the 
    hierarchy.
    
    Generally this method will work for encoding simple value only.  If your 
    object graph may contain SproutCore objects, you will need to encode it
    yourself.
    
    @param key {String} the key to set
    @param val {Object} the value
    @param func {Function} optional transform func
    @returns {SC.ObjectCoder} receiver
  */
  encode: function(key, val, func) {
    // normalize params
    if (func===undefined && val instanceof Function) {
      func = val; val = key; key = undefined; 
    }

    return this.js(key, val, function(cur) { 
      if (func) cur = func.call(this, cur, null, null);
      switch(SC.typeOf(cur)) {
      case SC.T_STRING:
        cur = this.string(cur);
        break;

      case SC.T_NUMBER:
        cur = this.number(cur);
        break;

      case SC.T_BOOL:
        cur = this.bool(cur);
        break;

      case SC.T_ARRAY:
        cur = this.array(cur, func) ;
        break;

      case SC.T_HASH:
        cur = this.hash(cur, func);
        break ;
        
      default:
        // otherwise, if the object has a designer attached, try to encode
        // view.
        cur = cur ? this.object(cur) : this.js(cur);
      }
      return cur ;
    });
  },
  
  /**
    Encodes a hash of objects.  The object values must be simple objects for
    this method to work.  You can also optionally pass a processing function
    that will be invoked for each value, giving you a chance to convert the
    value first.  The signature must be (key, value, rootObject).
    
    @param key {String} the key to set
    @param val {Object} the value
    @param func {Function} optional transform func
    @returns {SC.ObjectCoder} receiver
  */
  hash: function(key, val, func) {
    
    // normalize params
    if (func===undefined && val instanceof Function) {
      func = val; val = key; key = undefined; 
    }
    
    return this.js(key, val, function(x) { 
      var ret = [] ;
      for(var key in x) {
        if (!x.hasOwnProperty(key)) continue; // only include added...
        ret.push("%@: %@".fmt(this.encode(key), this.encode(x[key], func)));
      }
      return "{%@}".fmt(ret.join(","));
    });
  },

  /**
    Encodes a array of objects.  The object values must be simple objects for
    this method to work.  You can also optionally pass a processing function
    that will be invoked for each value, giving you a chance to convert the
    value first.  The signature must be (index, value, rootObject).
    
    @param key {String} the key to set
    @param val {Object} the value
    @param func {Function} optional transform func
    @returns {SC.ObjectCoder} receiver
  */
  array: function(key, val, func) {
    
    // normalize params
    if (func===undefined && val instanceof Function) {
      func = val; val = key; key = undefined; 
    }

    val = val.map(function(x) { return this.encode(x, func); }, this);
    val = "[%@]".fmt(val.join(","));

    return this.js(key, val);
  },
  
  /**
    Attempts to encode an object.  The object must implement the 
    encodeMethodName for this encoder, or else an exception will be raised.
    
    @param key {String} the key to set
    @param val {Object} the object to encode
    @returns {SC.ObjectCoder} receiver
  */
  object: function(key, val) {
    return this.js(key, val, function(x) {
      return this.constructor.encode(x, this);
    });
  },
  
  // ..........................................................
  // INTERNAL SUPPORT
  // 
  
  spaces: function() {
    var spaces = this.context ? this.context.get('spaces') : '' ;
    spaces = spaces + '  ';  
    return spaces ;
  }.property().cacheable(),
  
  /** 
    Emits the final JavaScript output for this coder based on the current
    attributes.
  */
  emit: function() {
    
    // return undefined if the encoding was rejected...
    if (this.invalid) return undefined ;
    
    var ret = [], attrs = this.attributes, key ;
    var methodName = this.get('extendMethodName');
    var spaces = this.get('spaces');
    
    // compute attribute body...
    for(key in attrs) {
      if (!attrs.hasOwnProperty(key)) continue ;
      ret.push("%@: %@".fmt(key, attrs[key]));
    }
    
    if (ret.length <= 0) {
      return "%@1%@2.%@3({})".fmt(spaces, this.className, methodName);
    } else {
      // handle NO class formatting..
      ret = ret.join(",");
      return "%@2.%@3({%@4})".fmt(spaces, this.className, methodName, ret);
    }
  },
  
  /**
    Begins encoding with a particular object, setting the className to the 
    object's className.  This is used internally by the encode() method.
  */
  begin: function(object) {
    var methodName = this.get('encodeMethodName');
    if (SC.typeOf(object[methodName]) !== SC.T_FUNCTION) {
      throw SC.$error("Cannot encode %@ because it does not respond to %@()".fmt(object, methodName)) ;
    } 
    
    // save className for later coding
    this.set('className', SC._object_className(object.constructor));

    // then call encode method...
    var ret = object[methodName](this);
    
    // if encoding method returns NO, then encoding is not allowed.
    // note that returning void should count as YES.
    this.invalid = ret === NO ;
    
    // and return this
    return this ;
  },
  
  init: function() {
    arguments.callee.base.apply(this,arguments);
    this.set('attributes', {});
  },
  
  destroy: function() {
    arguments.callee.base.apply(this,arguments);
    this.context = this.className = this.attributes = null ; // cleanup
  }
  
});

SC.ObjectCoder.encode = function(object, context) {
  // create coder and emit code...
  var coder = this.create({ context: context });
  var ret = coder.begin(object).emit();
  
  // cleanup and return
  coder.destroy();
  return ret ;
} ;

/* >>>>>>>>>> BEGIN source/coders/design.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

/* evil:true */

sc_require('coders/object');

/** @class

  A DesignCoder encodes specifically the design for a set of views.
  
  @extends SC.ObjectCoder
*/
SC.DesignCoder = SC.ObjectCoder.extend({
  extendMethodName: 'design',
  encodeMethodName: 'encodeDesign'  
});

/** 
  Patch SC.View to respond to encodeDesign().  This will proxy to the paired
  designer, if there is one.  If there is no paired designer, returns NO.
*/
SC.View.prototype.encodeDesign = function(coder) {
  return this.designer ? this.designer.encodeDesign(coder) : NO ;
};


/* >>>>>>>>>> BEGIN source/coders/localization.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

sc_require('coders/object');

/** @class

  A LocalizationCoder encodes specifically the localization for views.
  
  @extends SC.ObjectCoder
*/
SC.LocalizationCoder = SC.ObjectCoder.extend({
  extendMethodName: 'localization',
  encodeMethodName: 'encodeLoc'
});

/** 
  Patch SC.View to respond to encodeDesign().  This will proxy to the paired
  designer, if there is one.  If there is no paired designer, returns NO.
*/
SC.View.prototype.encodeLoc = function(coder) {
  return this.designer ? this.designer.encodeLoc(coder) : NO ;
};


/* >>>>>>>>>> BEGIN source/controllers/page_design.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

/** @class
  An instance of this controller is created for every page where designers 
  are involved.  The Designer's themselves will register with the 
  controller so that you can hook to the controller to manage the views and
  their editors.
  
  Among other things, this controller implements global selection support for
  the designers.
  
  @extends SC.Object
  @since SproutCore 1.0
*/
SC.PageDesignController = SC.Object.extend({
  
  // ..........................................................
  // SELECTION
  // 
  
  /** The current view builder selection. */
  selection: null,
  
  /** 
    Updates the selection either by adding the item or by reseting the 
    selection.  Calling this method with no parameters will reset the 
    selection.
    
    The passed selection must be a Designer object.
  */
  select: function(sel, extend) {
    var base = this.get('selection');
    if (!base || !extend || !base.contains(sel)) {
      base = (!extend || !base) ? SC.CoreSet.create() : base.copy();
      base.add(sel);
      this.set('selection', base.freeze()) ;
    }
    return this ;
  },
  
  /**
    Removes the passed items from the current selection.
    
    The passed selection must be a Designer object.
  */
  deselect: function(sel) {
    
    var base = this.get('selection');
    if (base && base.contains(sel)) {
      base = base.copy();
      base.remove(sel);
      this.set('selection', base.freeze());
    }
    return this;
  },
  
  /**
    Invoked whenever the selection changes.  Updates the selection states 
    on the old and new views.
  */
  selectionDidChange: function() {
    var sel = this.get('selection'),
        oldSel = this._selection ;

    // save old selection for next time
    this._selection = sel ;
    
    // set the isSelected state on new selection.
    if (sel) sel.setEach('designIsSelected', YES);
    
    // remove the isSelected state for old selection not in new selection.
    if (oldSel) {
      oldSel.forEach(function(s){ 
        if (!sel || !sel.contains(s)) s.set('designIsSelected', NO);
      }, this);
    }
    
  }.observes('selection'),
  
  
  /**
    Called by a view to reposition the current selection during a mouse 
    drag.
  */
  repositionSelection: function(evt, info) {
    var sel = this.get('selection');
    if (sel) sel.invoke('mouseReposition', evt, info);  
  },
  
  /**
    Called by a view to prepare all views in selection for repositioning
  */
  prepareReposition: function(info) {
    var sel = this.get('selection');
    if (sel) sel.invoke('prepareReposition', info);
  },
  
  // ..........................................................
  // DESIGNERS
  // 
  
  /** All of the designers on the current page. */
  designers: null,

  /**  
    Called by each designer when it is created to register itself with the
    controller.  You can use this to know which designers are currently in 
    the document to delete them as needed.
  */
  registerDesigner: function(designer) {
    this.get('designers').add(designer);
  },
  
  // ..........................................................
  // INTERNAL SUPPORT
  // 
  init: function() {
    this.designers = SC.Set.create();
    this.sel = [];
    arguments.callee.base.apply(this,arguments);
  }
  
}) ;
/* >>>>>>>>>> BEGIN source/css/css_style.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/**
  @class SC.CSSStyle

  A css style object represents a css style that is part of a single css rule 
  in a single css style sheet.
  
  @extends SC.Object
*/
SC.CSSStyle = SC.Object.extend(
/** @scope SC.CSSStyle.prototype */ {
  
  /**
    @property {String} a css string representing the style property
  */
  style: '',
  
  /**
    @property {SC.CSSRule} the rule this style is part of
  */
  rule: null
  
});

/* >>>>>>>>>> BEGIN source/css/css_rule.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

sc_require('css/css_style') ;

/**
  @class SC.CSSRule

  A css rule object represents a css rule that is part of a style sheet 
  object. You can create your own rules and add insert them in style sheets at
  runtime.
  
  @extends SC.Object
*/
SC.CSSRule = SC.Object.extend(
/** @scope SC.CSSRule.prototype */ {
  
});

/* >>>>>>>>>> BEGIN source/css/css_style_sheet.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

sc_require('css/css_rule') ;

/**
  @class SC.CSSStyleSheet

  A style sheet object wraps a document style sheet object. SC.CSSStyleSheet will
  re-use stylesheet objects as needed.
  
  @extends SC.Object
*/
SC.CSSStyleSheet = SC.Object.extend(
/** @scope SC.CSSStyleSheet.prototype */ {
  
  init: function() {
    arguments.callee.base.apply(this,arguments) ;
    
    var ss = this.styleSheet ;
    if (!ss) {
      // create the stylesheet object the hard way (works everywhere)
      ss = this.styleSheet = document.createElement('style') ;
      ss.type = 'text/css' ;
      var head = document.getElementsByTagName('head')[0] ;
      if (!head) head = document.documentElement ; // fix for Opera
      head.appendChild(ss) ;
    }
    
    // cache this object for later
    var ssObjects = this.constructor.styleSheets ;
    if (!ssObjects) ssObjects = this.constructor.styleSheets = {} ;
    ssObjects[SC.guidFor(ss)] ;
    
    // create rules array
    var rules = ss.rules || SC.EMPTY_ARRAY ;
    var array = SC.SparseArray.create(rules.length) ;
    array.delegate = this ;
    this.rules = array ;
    
    return this ;
  },
  
  /**
    @property {Boolean} YES if the stylsheet is enabled.
  */
  isEnabled: function(key, val) {
    if (val !== undefined) {
      this.styleSheet.disabled = !val ;
    }
    return !this.styleSheet.disabled ;
  }.property(),
  isEnabledBindingDefault: SC.Binding.bool(),
  
  /**
    DO NOT MODIFY THIS OBJECT DIRECTLY!!!! Use the methods defined on this
    object to update properties of the style sheet; otherwise, your changes 
    will not be reflected.
    
    @property {CSSStyleSheet} RO
  */
  styleSheet: null,
  
  /**
    @property {String}
  */
  href: function(key, val) {
    if (val !== undefined) {
      this.styleSheet.href = val ;
    }
    else return this.styleSheet.href ;
  }.property(),
  
  /**
    @property {String}
  */
  title: function(key, val) {
    if (val !== undefined) {
      this.styleSheet.title = val ;
    }
    else return this.styleSheet.title ;
  }.property(),
  
  /**
    @property {SC.Array} contains SC.CSSRule objects
  */
  rules: null,
  
  /**
    You can also insert and remove rules on the rules property array.
  */
  insertRule: function(rule) {
    var rules = this.get('rules') ;
  },
  
  /**
    You can also insert and remove rules on the rules property array.
  */
  deleteRule: function(rule) {
    var rules = this.get('rules') ;
    rules.removeObject(rule) ;
  },
  
  // TODO: implement a destroy method
  
  /**
    @private
    
    Invoked by the sparse array whenever it needs a particular index 
    provided.  Provide the content for the index.
  */
  sparseArrayDidRequestIndex: function(array, idx) {
    // sc_assert(this.rules === array) ;
    var rules = this.styleSheet.rules || SC.EMPTY_ARRAY ;
    var rule = rules[idx] ;
    if (rule) {
      array.provideContentAtIndex(idx, SC.CSSRule.create({ 
        rule: rule,
        styleSheet: this
      })); 
    }
  },
  
  /** @private synchronize the browser's rules array with our own */
  sparseArrayDidReplace: function(array, idx, amt, objects) {
    var cssRules = objects.collect(function(obj) { return obj.rule; }) ;
    this.styleSheet.rules.replace(idx, amt, cssRules) ;
  }
  
});

SC.mixin(SC.CSSStyleSheet,
/** SC.CSSStyleSheet */{
  
  /**
    Find a stylesheet object by name or href. If by name, .css will be 
    appended automatically.
    
    {{{
      var ss = SC.CSSStyleSheet.find('style.css') ;
      var ss2 = SC.CSSStyleSheet.find('style') ; // same thing
      sc_assert(ss === ss2) ; // SC.CSSStyleSheet objects are stable
    }}}
    
    @param {String} nameOrUrl a stylsheet name or href to find
    @returns {SC.CSSStyleSheet} null if not found
  */
  find: function(nameOrUrl) {
    var isUrl = nameOrUrl ? nameOrUrl.indexOf('/') >= 0 : NO ;
    
    if (!nameOrUrl) return null ; // no name or url? fail!
    
    if (!isUrl && nameOrUrl.indexOf('.css') == -1) {
      nameOrUrl = nameOrUrl + '.css' ;
    }
    
    // initialize styleSheet cache
    var ssObjects = this.styleSheets ;
    if (!ssObjects) ssObjects = this.styleSheets = {} ;
    
    var styleSheets = document.styleSheets ;
    var ss, ssName, ssObject, guid ;
    for (var idx=0, len=styleSheets.length; idx < len; ++idx) {
      ss = styleSheets[idx] ;
      if (isUrl) {
        if (ss.href === nameOrUrl) {
          guid = SC.guidFor(ss) ;
          ssObject = ssObjects[guid] ;
          if (!ssObject) {
            // cache for later
            ssObject = ssObjects[guid] = this.create({ styleSheet: ss }) ;
          }
          return ssObject ;
        }
      }
      else {
        if (ssName = ss.href) {
          ssName = ssName.split('/') ; // break up URL
          ssName = ssName[ssName.length-1] ; // get last component
          if (ssName == nameOrUrl) {
            guid = SC.guidFor(ss) ;
            ssObject = ssObjects[guid] ;
            if (!ssObject) {
              // cache for later
              ssObject = ssObjects[guid] = this.create({ styleSheet: ss }) ;
            }
            return ssObject ;
          }
        }
      }
    }
    return null ; // stylesheet not found
  },
  
  styleSheets: null
  
});

/* >>>>>>>>>> BEGIN source/ext/page.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

/** 
  Extend SC.Page to emit a design document for the entire page.
*/
SC.Page.prototype.emitDesign = function() {

  // awake all views.  this is needed to emit the design for them.
  this.awake();

  // the pageName must be set on the page so we can emit properly
  var pageName = this.get('pageName');
  
  // now encode the page.
  var ret = SC.DesignCoder.encode(this);
  
  // and add some wrapper
  ret = ['// SproutCore ViewBuilder Design Format v1.0',
    '// WARNING: This file is automatically generated.  DO NOT EDIT.  Changes you',
    '// make to this file will be lost.', '',
    '%@ = %@;'.fmt(pageName, ret),''].join("\n");
  
  return ret ;
};

/**
  Extend SC.Page to create a PageDesignController on demand.
  
  @property {SC.PageDesignController}
*/
SC.Page.prototype.designController = function() {
  if (!this._designController) {
    this._designController = SC.PageDesignController.create({ page: this });
  }
  return this._designController ;
}.property().cacheable();

/**
  Extend SC.Page to emit the localization for the current configuration of the
  view and all of its subviews.
*/
SC.Page.prototype.emitLocalization = function(design) {

  // awake all views.  this is needed to emit the design for them.
  this.awake();

  // the pageName must be set on the page so we can emit properly
  var pageName = this.get('pageName');
  
  // now encode the page.
  var ret = SC.LocalizationCoder.encode(this);

  // and add some wrapper
  ret = ['// SproutCore ViewBuilder Localization Format v1.0',
    '// WARNING: This file is automatically generated.  DO NOT EDIT.  Changes you',
    '// make to this file will be lost.', '',
    '%@.loc(%@);'.fmt(pageName, ret),''].join("\n");
  return ret ;
} ;

/** @private implement support for encoders */
SC.Page.prototype.encodeDesign = function(c) {
  // step through and find all views.  encode them.
  for(var key in this) {
    var view = this[key];
    if (view instanceof SC.View) c.js(key, view.emitDesign());
  }
  
  // save page name;
  c.string('pageName', this.get('pageName'));
};

SC.Page.prototype.encodeLoc = function(c) {
  // step through and find all views.  encode them.
  for(var key in this) {
    var view = this[key];
    if (view instanceof SC.View) c.js(key, view.emitLocalization());
  }
};

  


/* >>>>>>>>>> BEGIN source/ext/view.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

/*jslint evil:true */

/** 
  Extend SC.View with emitDesign() which will encode the view and all of its
  subviews then computes an empty element to attach to the design.
*/
SC.View.prototype.emitDesign = function() {
  
  // get design...
  var ret = SC.DesignCoder.encode(this);
  
  return ret ;
};

/**
  Extend SC.View to emit the localization for the current configuration of the
  view and all of its subviews.
*/
SC.View.prototype.emitLocalization = function(design) {
  var ret = SC.LocalizationCoder.encode(this);
  
  // prepare rootElement HTML.  Get the design, apply loc and generate the
  // emptyElement HTML...
  if (!design) design = this.emitDesign();
  var views = eval(design).loc(eval(ret)).create() ;
  var emptyElement = views.computeEmptyElement().replace(/\'/g,"\'");
  views.destroy();
  
  // now insert as extra param at end...
  ret = ret.replace(/\)$/, ", '%@')".fmt(emptyElement)) ;
  return ret ;
} ;

/* >>>>>>>>>> BEGIN source/mixins/button.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

SC.Button.Designer = {

  designProperties: 'title'.w()
  
};
/* >>>>>>>>>> BEGIN source/views/designer.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

/*global ViewBuilder */

/** @class

  A Designer class provides the core editing functionality you need to edit
  a view in the UI.  When your app loads in design.mode, a peer Designer 
  instance is created for every view using the class method Designer or
  SC.ViewDesigner if the view class does not define a Designer class.
  
  Whenever you put your app into design mode, all events will be routed first
  to the peer designer for an object, which will have an opportunity to 
  prosent a design UI.

  Likewise, the designer palettes provided by the view builder will focus on 
  the designer instead of the view itself.
  
  h2. Designer UI
  
  The basic ViewDesigner class automatically handles the UI interaction for
  layout.  You can also double click on the view to perform a default action.
  
  For views with isContainerView set to YES, double clicking on the view will
  automatically "focus" the view.  This allows you to select the view's 
  children instead of the view itself.

  @extends SC.Object
  @since SproutCore 1.0
*/
SC.ViewDesigner = SC.Object.extend(
/** @scope SC.ViewDesigner.prototype */ {

  /** The view managed by this designer. */
  view: null,
  
  /** The class for the design.  Set when the view is created. */
  viewClass: null,
  
  /** Set to YES if the view is currently selected for editing. */
  designIsSelected: NO,

  /** Set to YES if this particular designer should not be enabled. */
  designIsEnabled: YES,
  
  /**
    The current page.  Comes from the view.
    
    @property {SC.Page}
  */
  page: function() {
    var v = this.get('view');
    return (v) ? v.get('page') : null;
  }.property('view').cacheable(),
  
  /**
    The design controller from the page.  Comes from page
    
    @property {SC.PageDesignController}
  */
  designController: function() {
    var p = this.get('page');
    return (p) ? p.get('designController') : null ;  
  }.property('page').cacheable(),
  
  /** 
    If set to NO, the default childView encoding will not run.  You can use
    this option, for example, if your view creates its own childViews.
    
    Alternatively, you can override the encodeChildViewsDesign() and 
    encodeChildViewsLoc() methods.
    
    @property {Boolean}
  */
  encodeChildViews: YES,
  
  concatenatedProperties: ['designProperties', 'localizedProperties'],


  // ..........................................................
  // SIZE AND POSITIONING SUPPORT
  // 
  
  /**
    Set to NO to hide horizontal resize handles
  */
  canResizeHorizontal: YES,
  
  /**
    Set to NO to resize vertical handles
  */
  canResizeVertical: YES,
  
  /**
    Allows moving.
  */
  canReposition: YES,
  
  /**
    Determines the minimum allowed width
  */
  minWidth: 10,
  
  /**
    Determines the minimum allowed height
  */
  minHeight: 10,
  
  /**
    Determines maximum allowed width.  null means no limit
  */
  maxWidth: 100000000,
  
  /**
    Determines maximum allowed height.  null means no limit
  */
  maxHeight: 100000000,
  
  /**
    Returns the current layout for the view.  Set this property to update
    the layout.  Direct properties are exposed a well. You will usually want
    to work with those instead.
    
    @property
    @type {Hash}
  */
  layout: function(key, value) {
    var view = this.get('view');
    if (!view) return null; 
    
    if (value !== undefined) view.set('layout', value);
    return view.get('layout');
  }.property('view').cacheable(),
  
  /**
    The current anchor location.  This determines which of the other dimension 
    metrics are actually used to compute the layout.  The value may be one of:
    
     TOP_LEFT, TOP_CENTER, TOP_RIGHT, TOP_HEIGHT,
     CENTER_LEFT, CENTER_CENTER, CENTER_RIGHT, CENTER_HEIGHT
     BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT, BOTTOM_HEIGHT,
     WIDTH_LEFT, WIDTH_CENTER, WIDTH_RIGHT, WIDTH_HEIGHT,
     null
  
    @property
    @type {Number}
  */
  anchorLocation: function(key, value) {
    var layout = this.get('layout'), 
        K      = SC.ViewDesigner,
        h, v, frame, view, pview, pframe, ret;
        
    if (!layout) return null;

    // update to refelct new anchor locations...
    if (value !== undefined) {
      
      ret    = {}; 
      view   = this.get('view');
      frame  = view.get('frame');
      pview  = view.get('parentView');
      pframe = pview ? pview.get('frame') : null;
      if (!pframe) pframe = SC.RootResponder.responder.computeWindowSize();
      
      // compute new layout in each direction
      if (value & K.ANCHOR_LEFT) {
        ret.left = frame.x;
        ret.width = frame.width;
        
      } else if (value & K.ANCHOR_RIGHT) {
        ret.right = (pframe.width - SC.maxX(frame));
        ret.width = frame.width;
        
      } else if (value & K.ANCHOR_CENTERX) {
        ret.centerX = Math.round(SC.midX(frame) - (pframe.width/2)) ;
        ret.width = frame.width;
        
      } else if (value & K.ANCHOR_WIDTH) {
        ret.left = frame.x;
        ret.right = (pframe.width - SC.maxX(frame));
      }

      // vertical
      if (value & K.ANCHOR_TOP) {
        ret.top = frame.y;
        ret.height = frame.height;
        
      } else if (value & K.ANCHOR_BOTTOM) {
        ret.bottom = (pframe.height - SC.maxY(frame));
        ret.height = frame.height;
        
      } else if (value & K.ANCHOR_CENTERY) {
        ret.centerY = Math.round(SC.midY(frame) - (pframe.height/2)) ;
        ret.height = frame.height;
        
      } else if (value & K.ANCHOR_HEIGHT) {
        ret.top = frame.y;
        ret.bottom = (pframe.height - SC.maxY(frame));
      }

      this.set('layout', ret);
      layout = ret ;
    }
    
    if (!SC.none(layout.left)) {
      h = SC.none(layout.width) ? K.ANCHOR_WIDTH : K.ANCHOR_LEFT;
    } else if (!SC.none(layout.right)) h = K.ANCHOR_RIGHT;
    else if (!SC.none(layout.centerX)) h = K.ANCHOR_CENTERX;
    else h = 0;
     
    if (!SC.none(layout.top)) {
      v = SC.none(layout.height) ? K.ANCHOR_HEIGHT : K.ANCHOR_TOP;
    } else if (!SC.none(layout.bottom)) v = K.ANCHOR_BOTTOM ;
    else if (!SC.none(layout.centerY)) v = K.ANCHOR_CENTERY ;
    else v = 0;

    return v | h;
  }.property('layout').cacheable(),

  _layoutProperty: function(key, value) {  
    var layout = this.get('layout');
    if (!layout) return null;
    
    if (!SC.none(layout) && (value !== undefined)) {
      layout = SC.copy(layout);
      layout[key] = value;
      this.set('layout', layout);
    }
    
    return layout[key];
  },
  
  /**
    Returns the top offset of the current layout or null if not defined
  */
  layoutTop: function(key, value) {
    return this._layoutProperty('top', value);
  }.property('layout').cacheable(),

  /**
    Returns the bottom offset of the current layout or null if not defined
  */
  layoutBottom: function(key, value) {
    return this._layoutProperty('bottom', value);
  }.property('layout').cacheable(),

  /**
    Returns the centerY offset of the current layout or null if not defined
  */
  layoutCenterY: function(key, value) {
    return this._layoutProperty('centerY', value);
  }.property('layout').cacheable(),

  /**
    Returns the height offset of the current layout or null if not defined
  */
  layoutHeight: function(key, value) {
    return this._layoutProperty('height', value);
  }.property('layout').cacheable(),

  /**
    Returns the top offset of the current layout or null if not defined
  */
  layoutTop: function(key, value) {
    return this._layoutProperty('top', value);
  }.property('layout').cacheable(),

  /**
    Returns the left offset of the current layout or null if not defined
  */
  layoutLeft: function(key, value) {
    return this._layoutProperty('left', value);
  }.property('layout').cacheable(),
  
  /**
    Returns the right offset of the current layout or null if not defined
  */
  layoutRight: function(key, value) {
    return this._layoutProperty('right', value);
  }.property('layout').cacheable(),
  
  /**
    Returns the centerX offset of the current layout or null if not defined
  */
  layoutCenterX: function(key, value) {
    return this._layoutProperty('centerX', value);
  }.property('layout').cacheable(),
  
  /**
    Returns the width offset of the current layout or null if not defined
  */
  layoutWidth: function(key, value) {
    return this._layoutProperty('width', value);
  }.property('layout').cacheable(),
  
  // ..........................................................
  // GENERIC PROPERTIES
  // 
  // Adds support for adding generic properties to a view.  These will
  // overwrite whatever you write out using specifically supported props.
    
  // ..........................................................
  // HANDLE ENCODING OF VIEW DESIGN
  // 

  /**
    Encodes any simple properties that can just be copied from the view onto
    the coder.  This is used by encodeDesignProperties() and 
    encodeLocalizedProperties().
  */
  encodeSimpleProperties: function(props, coder) {    
    var view = this.get('view'), proto = this.get('viewClass').prototype ;
    props.forEach(function(prop) {
      var val = view[prop] ; // avoid get() since we don't want to exec props
      if (val !== undefined && (val !== proto[prop])) {
        coder.encode(prop, val) ;
      }
    }, this);
  },
  

  /** 
    Array of properties that can be encoded directly.  This is an easy way to
    add support for simple properties that need to be written to the design
    without added code.  These properties will be encoded by 
    encodeDesignProperties().
    
    You can add to this array in your subclasses.
  */
  designProperties: 'layout isVisible isEnabled styleClass'.w(),
  
  /** 
    Invoked by a design coder to encode design properties.  The default 
    implementation invoked encodeDesignProperties() and 
    encodeChildViewsDesign().  You can override this method with your own 
    additional encoding if you like.
  */
  encodeDesign: function(coder) {
    coder.set('className', SC._object_className(this.get('viewClass')));
    this.encodeDesignProperties(coder);
    this.encodeChildViewsDesign(coder);
    return YES ;
  },

  /**
    Encodes the design properties for the view.  These properties are simply
    copied from the view onto the coder.  As an optimization, the value of 
    each property will be checked against the default value in the class. If
    they match, the property will not be emitted.
  */
  encodeDesignProperties: function(coder) {
    return this.encodeSimpleProperties(this.get('designProperties'), coder);
  },
  
  /**
    Encodes the design for child views.  The default implementation loops 
    through child views.  If you store your child views elsewhere in your 
    config (for example as named properties), then you may want to override
    this method with your own encoding.
  */
  encodeChildViewsDesign: function(coder) {
    if (!this.get('encodeChildViews')) return;
    var view = this.view, childViews = view.childViews;
    if (childViews.length>0) coder.object('childViews', childViews);
  },

  /** 
    Array of localized that can be encoded directly.  This is an easy way to
    add support for simple properties that need to be written to the 
    localization without added code.  These properties will be encoded by 
    encodeLocalizedProperties().
    
    You can add to this array in your subclasses.
  */
  localizedProperties: [],
  
  /** 
    Invoked by a localization coder to encode design properties.  The default 
    implementation invoked encodeLocalizedProperties() and 
    encodeChildViewsLoc().  You can override this method with your own 
    additional encoding if you like.
  */
  encodeLoc: function(coder) {
    coder.set('className', SC._object_className(this.get('viewClass')));
    this.encodeLocalizedProperties(coder);
    this.encodeChildViewsLoc(coder);
    return YES ;
  },

  /**
    Encodes the localized properties for the view.  These properties are 
    simply copied from the view onto the coder.  As an optimization, the value 
    of  each property will be checked against the default value in the class. 
    If they match, the property will not be emitted.
  */
  encodeLocalizedProperties: function(coder) {
    return this.encodeSimpleProperties(this.get('localizedProperties'),coder);
  },
  
  /**
    Encodes the design for child views.  The default implementation loops 
    through child views.  If you store your child views elsewhere in your 
    config (for example as named properties), then you may want to override
    this method with your own encoding.
  */
  encodeChildViewsLoc: function(coder) {
    if (!this.get('encodeChildViews')) return;
    var view = this.view, childViews = view.childViews;
    if (childViews.length>0) coder.object('childViews', childViews);
  },

  /**
    This method is invoked when the designer is instantiated.  You can use 
    this method to reload any state saved in the view.  This method is called
    before any observers or bindings are setup to give you a chance to 
    configure the initial state of the designer.
  */
  awakeDesign: function() {},
  
  // ..........................................................
  // VIEW RELAYING
  // 
  // View property changes relay automatically...
  
  /**
    Invoked whenever the view changes.  This will observe all property 
    changes on the new view.
  */
  viewDidChange: function() {
    var view = this.get('view'), old = this._designer_view ;
    if (view === old) return; // nothing to do

    var func = this.viewPropertyDidChange ;
    if (old) old.removeObserver('*', this, func);
    this._designer_view = view ;
    if (view) view.addObserver('*', this, func);
    this.viewPropertyDidChange(view, '*', null, null);
  }.observes('view'),
  
  /**
    Invoked whenever a property on the view has changed.  The passed key will
    be '*' when the entire view has changed.  The default implementation here
    will notify the property as changed on the reciever if the 
    property value is undefined on the reciever.
    
    It will notify all properties changed for '*'.  You may override this 
    method with your own behavior if you like.
  */
  viewPropertyDidChange: function(view, key) {    
    if (key === '*') this.allPropertiesDidChange();
    else if (this[key] === undefined) this.notifyPropertyChange(key) ;
    
    if ((key === '*') || (key === 'layout')) {
      if (this.get('designIsSelected') && this._handles) {
        this._handles.set('layout', SC.clone(view.get('layout')));
      }
    }
  },
  
  /**
    The unknownProperty handler will pass through to the view by default. 
    This will often provide you the support you need without needing to 
    customize the Designer.  Just make sure you don't define a conflicting
    property name on the designer itself!
  */
  unknownProperty: function(key, value) {
    if (value !== undefined) {
      this.view.set(key, value);
      return value ;
    } else return this.view.get(key);
  },
  
  // ......................................
  // PRIVATE METHODS
  //
  
  init: function() {
    
    // setup design from view state...
    this.awakeDesign();
    
    // setup bindings, etc
    arguments.callee.base.apply(this,arguments);
    
    // now add observer for property changes on view to relay change out.
    this.viewDidChange();
    
    // and register with designController, if defined...
    var c= this.get('designController');
    if (c) c.registerDesigner(this) ;
    
  },

  destroy: function() {
    arguments.callee.base.apply(this,arguments);
    this.set('view', null); // clears the view observer...  
  },
  
  designIsSelectedDidChange: function() {
    if (SC.kindOf(this.view, SC.Pane)) return this ; 
    
    var isSel = this.get('designIsSelected');
    var handles = this._handles;
    
    if (isSel) {
      
      if (!handles) {
        handles = this._handles = SC.SelectionHandlesView.create({ 
          designer: this 
        });
      }
      
      var parent = this.view.get('parentView');
      if (!handles.get('parentView') !== parent) parent.appendChild(handles);
      handles.set('layout', this.view.get('layout'));
    } else if (handles) {
      if (handles.get('parentView')) handles.removeFromParent();
    }
  }.observes('designIsSelected'),
  
  tryToPerform: function(methodName, arg1, arg2) {
    // only handle event if we are in design mode
    var page = this.view ? this.view.get('page') : null ;
    var isDesignMode = page ? page.get('needsDesigner') || page.get('isDesignMode') : NO ;

    // if we are in design mode, route event handling to the designer
    // otherwise, invoke default method.
    if (isDesignMode) {
      return arguments.callee.base.apply(this,arguments);
    } else {
      return SC.Object.prototype.tryToPerform.apply(this.view, arguments);
    }
  },
    
  // ..........................................................
  // DRAWING SUPPORT
  // 

  /**
    Update the layer to add any design-specific marking 
  */
  didCreateLayer: function() {},

  /**
    Update the layer to add any design-specific marking
  */
  didUpdateLayer: function() {},

  /**
    Update the layer to add any design-specific marking
  */
  willDestroyLayer: function() {},
  
  // ..........................................................
  // MOUSE HANDLING
  // 
  
  HANDLE_MARGIN: 5,
  
  /**
    Select on mouseDown.  If metaKey or shiftKey is pressed, add to
    selection.  Otherwise just save starting info for dragging
  */
  mouseDown: function(evt) {
    if (!this.get('designIsEnabled')) return NO ;
    
    // save mouse down info
    var view = this.get('view'), 
        info, vert, horiz, repos, frame, pview, margin, canH, canV;
        
    if (!view) return NO; // nothing to do
    
    // save mouse down state for later use
    this._mouseDownInfo = info = {
      layout:   SC.copy(view.get('layout')),
      selected: this.get('designIsSelected'),
      dragged:  NO,
      metaKey:  evt.metaKey || evt.shiftKey,
      source:   this,
      x: evt.pageX, y: evt.pageY
    };    
    info.hanchor = info.vanchor = info.reposition = NO; 

    // detect what operations are available.
    repos = this.get('canReposition');
    horiz = vert = NO ;
    if (info.selected) {
      frame = view.get('frame');
      pview = view.get('parentView');
      if (frame && pview) frame = pview.convertFrameToView(frame, null);

      margin = this.HANDLE_MARGIN;

      // detect if we are in any hotzones
      if (frame) {
        if (Math.abs(info.x - SC.minX(frame)) <= margin) {
          horiz = "left";
        } else if (Math.abs(info.x - SC.maxX(frame)) <= margin) {
          horiz = "right";
        }

        if (Math.abs(info.y - SC.minY(frame)) <= margin) {
          vert = "top";
        } else if (Math.abs(info.y - SC.maxY(frame)) <= margin) {
          vert = "bottom";
        } 
      }

      canH = this.get('canResizeHorizontal');
      canV = this.get('canResizeVertical');

      // look for corners if can resize in both directions...
      if (canH && canV) {
        if (!vert || !horiz) vert = horiz = NO ; 

      // if can only resize horizonal - must be in middle vertical
      } else if (canH) {
        vert = NO ;
        if (Math.abs(info.y - SC.midY(frame)) > margin) horiz = NO;

      // if can only resize vertical - must be in middle horizontal
      } else if (canV) {
        horiz = NO ;
        if (Math.abs(info.x - SC.midX(frame)) > margin) vert = NO ;

      // otherwise, do not allow resizing
      } else horiz = vert = NO ;
    }

    // now save settings...
    if (horiz) info.hanchor = horiz ;
    if (vert) info.vanchor = vert ;
    if (!horiz && !vert && repos) info.reposition = YES ; 
    
    // if not yet selected, select item immediately.  This way future events
    // will be handled properly
    if (!info.selected) {
      this.get('designController').select(this, info.metaKey);
    }

    // save initial info on all selected items
    if (info.reposition) this.get('designController').prepareReposition(info);    
    
    return YES ;
  },

  prepareReposition: function(info) {
    var view = this.get('view'),
        layout = view ? SC.copy(view.get('layout')) : {};
    info[SC.keyFor('layout', SC.guidFor(this))] = layout;
    return this ;
  },
  
  /**
    mouse dragged will resize or reposition depending on the settings from
    mousedown.
  */
  mouseDragged: function(evt) {
    if (!this.get('designIsEnabled')) return NO ;
    var info = this._mouseDownInfo, 
        view = this.get('view'),
        layout;
    
    if (view && (info.hanchor || info.vanchor)) {
      layout = SC.copy(this.get('layout'));
      if (info.hanchor) this._mouseResize(evt, info, this.HKEYS, layout);
      if (info.vanchor) this._mouseResize(evt, info, this.VKEYS, layout);
      this.set('layout', layout);
      
    } else if (info.reposition) {
      this.get('designController').repositionSelection(evt, info);
    }
  },
  
  /**
    On mouseUp potentially change selection and cleanup.
  */
  mouseUp: function(evt) {
    if (!this.get('designIsEnabled')) return NO ;
    
    var info = this._mouseDownInfo;
        
    // if selected on mouse down and we didn't do any dragging, then deselect.
    if (info.selected && !info.dragged) {
      
      // is the mouse still inside the view?  If not, don't do anything...
      var view = this.get('view'),
          frame = view ? view.get('frame') : null, 
          pview = view.get('parentView');
          
      if (frame && pview) frame = pview.convertFrameToView(frame, null);

      //debugger;
      if (!frame || SC.pointInRect({ x: evt.pageX, y: evt.pageY }, frame)) {
        var controller = this.get('designController');
        if (info.metaKey) controller.deselect(this);
        else controller.select(this, NO);
      }
    }
    
    this._mouseDownInfo = null;
    
    return YES ;
  },
  
  /**
    Called by designerController to reposition the view
  */
  mouseReposition: function(evt, info) {
    var layout = SC.copy(this.get('layout'));
    this._mouseReposition(evt, info, this.HKEYS, layout);
    this._mouseReposition(evt, info, this.VKEYS, layout);
    this.set('layout', layout);
    return this; 
  },
  
  HKEYS: {
    evtPoint: "pageX",
    point:    "x",
    min:      "minWidth",
    max:      "maxWidth",
    head:     "left",
    tail:     "right",
    center:   "centerX",
    size:     "width",
    anchor:   "hanchor"
  },

  VKEYS: {
    evtPoint: "pageY",
    point:    "y",
    min:      "minHeight",
    max:      "maxHeight",
    head:     "top",
    tail:     "bottom",
    center:   "centerY",
    size:     "height",
    anchor:   "vanchor"
  },
  
  /**
    Generic resizer.  Must pass one set of keys: VKEYS, HKEYS
  */
  _mouseResize: function(evt, info, keys, ret) {
    
    var delta  = evt[keys.evtPoint] - info[keys.point],
        layout = info.layout,
        view   = this.get('view'),
        min    = this.get(keys.min),
        max    = this.get(keys.max),
        
        headKey   = keys.head,
        tailKey   = keys.tail,
        centerKey = keys.center,
        sizeKey   = keys.size,
        
        hasHead   = !SC.none(layout[keys.head]),
        hasTail   = !SC.none(layout[keys.tail]),
        hasCenter = !SC.none(layout[keys.center]),
        hasSize   = !SC.none(layout[keys.size]), 
        w;

    if (info[keys.anchor] === headKey) {
      
      // if left aligned, adjust left size and width if set.
      if (hasHead) {
        if (hasSize) {
          w = layout[sizeKey];
          ret[sizeKey] = Math.min(max, Math.max(min, Math.floor(layout[sizeKey] - delta)));
          min = (layout[headKey]+w) - min;
          max = (layout[headKey]+w) - max;
          
          ret[headKey] = Math.max(max, Math.min(min, Math.floor(layout[headKey]+delta)));
          
        } else {
          ret[headKey] = Math.floor(layout[headKey]+delta);
        }
      
      // if right aligned or centered, adjust the width...
      } else if (hasTail || hasCenter) {
        if (hasCenter) delta *= 2;
        ret[sizeKey] = Math.max(min, Math.min(max, Math.floor((layout[sizeKey]||0)-delta)));

      // otherwise, adjust left
      } else ret[headKey] = Math.floor((layout[headKey]||0)+delta);

    } else if (info[keys.anchor] === tailKey) {
      
      // reverse above
      if (hasTail) {

        if (hasSize) {
          w = layout[sizeKey];
          ret[sizeKey] = Math.min(max, Math.max(min, Math.floor(layout[sizeKey] + delta)));
          min = (layout[tailKey]+w)-min;
          max = (layout[tailKey]+w)-max;
          
          ret[tailKey] = Math.max(max, Math.min(min, Math.floor(layout[tailKey]-delta)));

        } else {
          ret[tailKey] = Math.floor(layout[tailKey]-delta);
        }
        
      } else {
        if (hasCenter) delta *= 2;
        ret[sizeKey] = Math.max(min, Math.min(max, Math.floor((layout[sizeKey]||0)+delta)));
      }
    }

    return this;
  },
  
  _mouseReposition: function(evt, info, keys, ret) {
    var delta  = evt[keys.evtPoint] - info[keys.point],
        layout = info[SC.keyFor('layout', SC.guidFor(this))],
        view   = this.get('view'),
        
        headKey   = keys.head,
        tailKey   = keys.tail,
        centerKey = keys.center,
        sizeKey   = keys.size,
        
        hasHead   = !SC.none(layout[headKey]),
        hasTail   = !SC.none(layout[tailKey]),
        hasCenter = !SC.none(layout[centerKey]),
        hasSize   = !SC.none(layout[sizeKey]), 
        w;

    // auto-widths can't be repositioned
    if (hasHead && hasTail && !hasSize) return NO ;
    
    // left/top aligned, just adjust top/left location
    if (hasHead) {
      ret[headKey] = layout[headKey]+delta;
      
    // right/bottom aligned, adjust bottom/right location
    } else if (hasTail) {
      ret[tailKey] = layout[tailKey]-delta;

    } else if (hasCenter) {
      ret[centerKey] = layout[centerKey]+delta;
      
    } else ret[headKey] = (layout[headKey]||0)+delta;
    
    return YES ;
  }
    
}) ;

// Set default Designer for view
if (!SC.View.Designer) SC.View.Designer = SC.ViewDesigner ;

// ..........................................................
// DESIGN NOTIFICATION METHODS
//
// These methods are invoked automatically on the designer class whenever it 
// is loaded.

SC.ViewDesigner.mixin({

  ANCHOR_LEFT:    0x0001,
  ANCHOR_RIGHT:   0x0002,
  ANCHOR_CENTERX: 0x0004,
  ANCHOR_WIDTH:   0x0010,
  
  ANCHOR_TOP:     0x0100,
  ANCHOR_BOTTOM:  0x0200,
  ANCHOR_CENTERY: 0x0400,
  ANCHOR_HEIGHT:  0x1000,
  
  /**
    Invoked whenever a designed view is loaded.  This will save the design
    attributes for later use by a designer.
  */
  didLoadDesign: function(designedView, sourceView, attrs) {
    designedView.isDesign = YES ; // indicates that we need a designer.
  },

  /**
    Invoked whenever a location is applied to a designed view.  Saves the 
    attributes separately for use by the design view.
  */
  didLoadLocalization: function(designedView, attrs) {
    // nothing to do for now.
  },
  
  /**
    Invoked whenver a view is created.  This will create a peer designer if 
    needed.
  */
  didCreateView: function(view, attrs) {
    // add designer if page is in design mode
    var page = view.get('page'), design = view.constructor;
    
    if (design.isDesign && page && page.get('needsDesigner')) {
      
      // find the designer class
      var cur = design;
      while(cur && !cur.Designer) cur = cur.superclass;
      var DesignerClass = (cur) ? cur.Designer : SC.View.Designer;
      
      // next find the first superclass view that is not a design (and a real
      // class).  This is important to make sure that we can determine the 
      // real name of a view's class.
      while (design && design.isDesign) design = design.superclass;
      if (!design) design = SC.View;
      
      view.designer = DesignerClass.create({
        view: view,
        viewClass: design
      });
    }
  }
  
});


// ..........................................................
// FIXUP SC.View
// 

SC.View.prototype._orig_respondsTo = SC.View.prototype.respondsTo;
SC.View.prototype._orig_tryToPerform = SC.View.prototype.tryToPerform;
SC.View.prototype._orig_createLayer = SC.View.prototype.createLayer;
SC.View.prototype._orig_updateLayer = SC.View.prototype.updateLayer;
SC.View.prototype._orig_destroyLayer = SC.View.prototype.destroyLayer;

/**
  If the view has a designer, then patch respondsTo...
*/
/*SC.View.prototype.respondsTo = function( methodName ) {
  var ret = !!(SC.typeOf(this[methodName]) === SC.T_FUNCTION);
  if (this.designer) ret = ret || this.designer.respondsTo(methodName);
  return ret ;
} ;*/
SC.View.prototype.respondsTo = function( methodName ) {
  if (this.designer) {
    var ret = !!(SC.typeOf(this[methodName]) === SC.T_FUNCTION);
    ret = ret || this.designer.respondsTo(methodName);
    return ret;
  }
  else {
    return this._orig_respondsTo(methodName);
  }
};

/** 
  If the view has a designer, give it an opportunity to handle an event 
  before passing it on to the main view.
*/
/*SC.View.prototype.tryToPerform = function(methodName, arg1, arg2) {
  if (this.designer) {
    return this.designer.tryToPerform(methodName, arg1, arg2);
  } else {
    return this._orig_respondsTo(methodName) && this[methodName](arg1, arg2);
  }
} ;*/
SC.View.prototype.tryToPerform = function(methodName, arg1, arg2) {
  if (this.designer) {
    return this.designer.tryToPerform(methodName, arg1, arg2);
  }
  else {
    return this._orig_tryToPerform(methodName, arg1, arg2);
  }
};


/*
  If the view has a designer, also call designers didCreateLayer method to 
  allow drawing.
*/
SC.View.prototype.createLayer = function() {
  var ret = this._orig_createLayer.apply(this, arguments);
  if (this.designer) this.designer.didCreateLayer();
  return ret ;
};

/*
  If the view has a designer, also call the designer's didUpdateLayer method 
  to allow drawing.
*/
SC.View.prototype.updateLayer = function() {
  var ret = this._orig_updateLayer.apply(this, arguments);
  if (this.designer) this.designer.didUpdateLayer();
  return ret ;
};

/**
  If the view has a designer, also call the designers willDestroyLayer
  method.
*/
SC.View.prototype.destroyLayer = function() {
  if (this.designer) this.designer.willDestroyLayer();
  return this._orig_destroyLayer.apply(this, arguments);
};

/* >>>>>>>>>> BEGIN source/views/button.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

sc_require('views/designer');
sc_require('mixins/button');

SC.ButtonView.Designer = SC.ViewDesigner.extend( SC.Button.Designer,
/** @scope SC.ButtonView.Designer.prototype */ {
  
  encodeChildViews: NO,
  
  designProperties: 'theme buttonBehavior href'.w(),
  
  canResizeVertical: NO,
  
  canResizeHorizontal: YES
  
});
/* >>>>>>>>>> BEGIN source/views/label.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

sc_require('views/designer');

SC.LabelView.Designer = SC.ViewDesigner.extend(
/** @scope SC.LabelView.Designer.prototype */ {
  
  encodeChildViews: NO,
  
  designProperties: 'value escapeHTML'.w()
  
});
/* >>>>>>>>>> BEGIN source/views/selection_handles.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

/**
  This view draws selection handles for a given designer.  It will also 
  forward any mouse events to the underlying designer.
*/
SC.SelectionHandlesView = SC.View.extend(
/** @scope SC.SelectionHandlesView.prototype */ {

  /**
    The designer that owns this selection.  mouse and keyboard events are 
    forwarded to this.
  */
  designer: null,
  
  classNames: 'handles',
  
  render: function(context, firstTime) {
    var designer = this.get('designer'),
        vertical = designer ? designer.get('canResizeVertical') : NO,
        horizontal = designer ? designer.get('canResizeHorizontal') : NO,
        handles ;
        
    // render handles
    if (firstTime || (vertical !== this._vertical) || (horizontal === this._horizontal)) {
      this._vertical = vertical ;
      this._horizontal = horizontal;

      if (vertical && horizontal) {
        handles = ['top left', 'top right', 'bottom left','bottom right'];
      } else if (vertical) {
        handles = 'top bottom'.w();
      } else if (horizontal) {
        handles = 'left right'.w();
      } else handles = [];


      handles.forEach(function(classNames) {
        context.begin('span')
          .classNames(classNames.w())
          .addClass('handle')
          .end();
      }, this);
    }
    
  },

  // ..........................................................
  // EVENT HANDLING
  // 
  // By default just forward to designer
  
  mouseDown: function(evt) {
    var d = this.designer;
    return (d && d.mouseDown) ? d.mouseDown(evt) : null;
  },
  
  mouseUp: function(evt) {
    var d = this.designer;
    return (d && d.mouseUp) ? d.mouseUp(evt) : null;
  },
  
  mouseMoved: function(evt) {
    var d = this.designer;
    return (d && d.mouseMoved) ? d.mouseMoved(evt) : null;
  },
  
  mouseDragged: function(evt) {
    var d = this.designer;
    return (d && d.mouseDragged) ? d.mouseDragged(evt) : null;
  }
  
});
/* >>>>>>>>>> BEGIN source/views/tab.js */
// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

sc_require('views/designer');

SC.TabView.Designer = SC.ViewDesigner.extend(
/** @scope SC.TabView.Designer.prototype */ {
  
  encodeChildViews: NO,
  
  designProperties: 'nowShowing items itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey tabLocation userDefaultKey'.w()
  
});
/* >>>>>>>>>> BEGIN bundle_loaded.js */
; if ((typeof SC !== 'undefined') && SC && SC.bundleDidLoad) SC.bundleDidLoad('sproutcore/designer');
