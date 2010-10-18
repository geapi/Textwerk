/*globals  TextWerk*/
/**
 * The base document model.
 *
 * @extends TextWerk.Document
 *
 * @version 0.1
 * @since 0.1
 */
sc_require('core');

TextWerk.Document = SC.Record.extend(LinkIt.Node, { 
  primaryKey: 'id',
  name: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Enter Name' }),
  collection: SC.Record.attr('TextWerk.DocumentCollection'),
  referrer: SC.Record.attr('TextWerk.Document'),
  citee: SC.Record.attr('TextWerk.Document'),

    
  // ..........................................................
  // LINKIT SPECIFIC INFORMTION
  // 
  terminals: ['ref', 'cit'],
  position: SC.Record.attr(Object),
  
  links: function(){
    var links = [];
    
    // get referrer
    var ref = this.get('referrer');
    if (ref){
      var refLink = SC.Object.create( LinkIt.Link, {
        startNode: ref,
        startTerminal: 'cit',
        endNode: this,
        endTerminal: 'ref'
      });
      links.push(refLink);
    }

    // get citee
    var cit = this.get('citee');
    if (cit){
      var citLink = SC.Object.create( LinkIt.Link, {
        startNode: cit,
        startTerminal: 'ref',
        endNode: this,
        endTerminal: 'cit'
      });
      links.push(citLink);
    }
    
    // spouse if you are the male
    //var spouse = this.get('spouse');
    //var isMale = this.get('isMale');
    //if (isMale && spouse){
    //  var spouseLink = SC.Object.create( LinkIt.Link, {
    //    startNode: this,
    //    startTerminal: 'sig',
    //    endNode: spouse,
    //    endTerminal: 'sig'
    //  });
    //  links.push(spouseLink);
    //}
    
    return links;
  }.property('referrer', 'citee').cacheable(),
  
  canLink: function(link) {
    if (!link) return NO;
    
    var sn = link.get('startNode'), st = link.get('startTerminal');
    var en = link.get('endNode'), et = link.get('endTerminal');
    
    // Make sure we don't connect to ourselves.
    if (sn === en) return NO;
    //console.log('\nCan Link: (%@).%@ => (%@).%@'.fmt(SC.guidFor(sn), st, SC.guidFor(en), et));

    // Make sure we don't already have this link.
    if (this._hasLink(link)) return NO;
    


    // Data Points
    var hasCit = (terms.indexOf('cit') > -1);
    var hasRef = (terms.indexOf('ref') > -1);

    
    //console.log('citKidsIdx: %@, hasCitIdx: %@, refKidsIdx: %@, hasRefIdx: %@'.fmt(citHasKids, hasCit, refHasKids, hasRef));
    
    if(hasRef && hasCit) { 
      //console.log('(%@,%@) Cit link to Kids: %@'.fmt(SC.guidFor(sn), SC.guidFor(en), terms )); 
      return YES; 
    }
 
    // TODO: [EG] add the check to make sure there is no incest

    return NO;
  },
    
  _hasLink: function(link) {
    var links = this.get('links') || [];
    var len = links.get('length'), n;
    var linkID = LinkIt.genLinkID(link);
    for (var i = 0; i < len; i++) {
      n = links.objectAt(i);
      if (LinkIt.genLinkID(n) === linkID) {
        return YES;
      }
    }
  },
  
  didCreateLink: function(link) {
    var l = link[0]; // The link is comprised of an ARRAY of links with the Bi-directional links...often you only need the first object to complete the link
    var sn = l.get('startNode'), st = l.get('startTerminal');
    var en = l.get('endNode'), et = l.get('endTerminal');
    if(et === 'sig'){
      this.set('spouse', en);
    }
    else if (et === 'ref' && sn !== this){
      this.set('referrer', sn);
    }
    else if (et === 'cit' && sn !== this){
      this.set('citee', sn);
    }
  },
  
  willDeleteLink: function(link) {
    var sn = link.get('startNode'), st = link.get('startTerminal');
    var en = link.get('endNode'), et = link.get('endTerminal');
	if (et === 'ref'){
    this.set('referrer', null);
    }
    else if (et === 'cit'){
      this.set('citee', null);
    }
  }
});
