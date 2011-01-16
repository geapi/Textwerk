// ==========================================================================
// Project:   Textwerk
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk, Textwerk */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
Textwerk = SC.Application.create(
/** @scope Textwerk.prototype */
 {

    NAMESPACE: 'Textwerk',
    VERSION: '0.1.2',

		ds:null,


    _distinctYears: null,
	loadingFromFixtures: NO,

    // method to pull the distinct years out of the paper collection
	// should be offloaded to backend maybe
    getDistinctYears: function() {
        if (this._distinctYears) {
			console.log("Already have the years");
        }
        else {
			console.log("Computing the years");
            var docs = this.store.find(Textwerk.AclPaper);
            this._distinctYears = [];
            docs.forEach(function(item) {
				var _itemYear = item.get('year');
				//console.log("Year: "+_itemYear + " array length: "+ this._distinctYears.length + " indexOf: "+ this._distinctYears.indexOf(_itemYear));
                	if(this._distinctYears.indexOf(_itemYear) == -1){
						//console.log("found a new year: >"+ _itemYear+"<");
						this._distinctYears[this._distinctYears.length] = _itemYear; 
					}
                return YES;
            },
            this);
			console.log("Total (distinct) years found: "+this._distinctYears.length);
        }
		return this._distinctYears;
    },
    _currentRecordID: 0

  // ..........................................................
  // Helper Functions
  // 

  /**
   * Retrieves a single record from the store.
   *
   * @param {SC.Record} recordType The type of the record to retrieve.
   * @param {String|Number} id The ID of the record to retrieve.
   *
   * @returns {CoreOrion.Record} The instantiated record.
   */
  ///findRecord: function(recordType, id) {
  ///  return this.get('store').find(recordType, id);
  ///},
///
  ////**
  /// * Retrieves all records from the store matching the given query.
  /// *
  /// * @param {SC.Query} q The query to apply.
  /// *
  /// * @returns {SC.RecordArray} A SC.RecordArray of matching records.
  /// */
  ///findRecords: function(q) {
  ///  return this.get('store').find(q);
  ///},
///
  ////**
  /// * Creates a new record in the store.
  /// *
  /// * @param {CoreOrion.Record} recordType The type of the record.
  /// * @param {Hash} dataHash The data hash used to seed the new record (optional).
  /// *
  /// * @returns {CoreOrion.Record} A new record instance.
  /// */
  ///createRecord: function(recordType, dataHash) {
  ///  if (!dataHash) dataHash = {};
///
  ///  // Assign the new record a negative integer ID
  ///  if (dataHash.id === undefined) {
  ///    dataHash.id = this._currentRecordID + '';
  ///    this._currentRecordID--;
  ///  }
///
  ///  return this.get('store').createRecord(recordType, dataHash);
  ///},
///
  ///destroyRecord: function(rec){
  ///  if (SC.none(rec) || !SC.kindOf(rec, SC.Record)) return NO;
  ///  var sk = rec.get('storeKey');
  ///  this.get('store').destroyRecord(null, null, sk);
  ///  return YES;
  ///}

});
