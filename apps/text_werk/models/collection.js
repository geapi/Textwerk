// ==========================================================================
// Project:   TextWerk.Collection
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
TextWerk.Collection = SC.Record.extend(
/** @scope TextWerk.Collection.prototype */ {

  primaryKey: 'id',
  name: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Enter Collection Name' }),
  papers: SC.Record.toMany('TextWerk.Paper', {
    inverse: 'collection',
    isMaster: YES
  }),

  members: function(){
    var papers = this.get('papers');
    var i, len, members = [];
    len = papers.get('length');
    for(i = 0; i < len; i++ ){
      members.push(papers.objectAt(i));
    }
    return members;
  }.property('papers').cacheable(),

  // ..........................................................
  // Methods
  // 

  /**
    Add a new member to the family.
  */
  addMember: function(memberModel) {
    var store = TextWerk.get('store');
    if (store && memberModel) {
      var member = TextWerk.createRecord(memberModel, {
        name: 'Name here...'
      });
      if (member.instanceOf(TextWerk.Paper)){
        var docs = this.get('papers');
        docs.pushObject(member);
      }
      else {
        console.error('Bad member type');
      }
    }
  },

  removeMember: function(member){
    var docs, store = TextWerk.get('store');
    if (member.instanceOf(TextWerk.Paper)){
      docs = this.get('papers');
      docs.removeObject(member);
    }
    else {
      console.error('Bad member type');
    }
  }

}) ;
