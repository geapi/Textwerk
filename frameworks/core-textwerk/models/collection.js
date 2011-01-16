// ==========================================================================
// Project:   Textwerk.Collection
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CoreTextwerk.Collection = SC.Record.extend(
/** @scope Textwerk.Collection.prototype */ {

  primaryKey: 'id',
  name: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Enter Collection Name' }),
  papers: SC.Record.toMany('CoreTextwerk.Paper', {
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
    Add a new member to the collection.
  */
  addMember: function(memberModel) {
    var store = CoreTextwerk.get('store');
    if (store && memberModel) {
      var member = Textwerk.createRecord(memberModel, {
        name: 'Name here...'
      });
      if (member.instanceOf(CoreTextwerk.Paper)){
        var docs = this.get('papers');
        docs.pushObject(member);
      }
      else {
        console.error('Bad member type');
      }
    }
  },

  removeMember: function(member){
    var docs, store = CoreTextwerk.get('store');
    if (member.instanceOf(CoreTextwerk.Paper)){
      docs = this.get('papers');
      docs.removeObject(member);
    }
    else {
      console.error('Bad member type');
    }
  }

}) ;
