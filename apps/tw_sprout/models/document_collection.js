/**
 * The base document collection model.
 *
 * @author Georg Apitz
 *
 * @version 0.1
 * @since 0.1
 */
sc_require('core');

TextWerk.DocumentCollection = SC.Record.extend({ 
  primaryKey: 'id',
  name: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Enter DocumentCollection Name' }),
  documents: SC.Record.toMany('TextWerk.Document', {
    inverse: 'DocumentCollection',
    isMaster: YES
  }),
  
  members: function(){
    var documents = this.get('documents');
    
    var i, len, members = [];
    len = documents.get('length');
    for(i = 0; i < len; i++ ){
      members.push(documents.objectAt(i));
    }
	//console.log('members called, length: '+ members);
    return members;
  }.property('documents').cacheable(),
  
  // ..........................................................
  // Methods
  // 
  
  /**
    Add a new member to the DocumentCollection.
  */
  addMember: function(memberModel, isMale) {
    var store = TextWerk.get('store');
    if (store && memberModel) {
      var member = TextWerk.createRecord(memberModel, {
        name: 'Name here...',
      });
      if (member.instanceOf(TextWerk.Document)){
        var ppl = this.get('documents');
        ppl.pushObject(member);
      }
      else {
        console.error('Bad member type');
      }
    }
  }
});