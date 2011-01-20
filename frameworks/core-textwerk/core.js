/**
 * Date: Jan 13, 2011
 * Time: 6:43:04 AM
 * To change this template use File | Settings | File Templates.
 */
/* globals CoreTextwerk */
CoreTextwerk = SC.Object.create({

    /*
     * CoreTextwerk data source types
     */
    REMOTE_DATA_SOURCE: 0x0001,
    FIXTURES_DATA_SOURCE: 0x0002,
    dataSourceType: 0x0001,

     _currentRecordID: 0,

    initializeStore: function() {

        // Create the appropriate data source.
        // Create the appropriate data source.
        var dataSource;
        if (CoreTextwerk.get('dataSourceType') === CoreTextwerk.REMOTE_DATA_SOURCE) {
            dataSource = CoreTextwerk.Corpus.create();
            SC.Logger.log('Using remote data source.');
        }
        else { // FIXTURES_DATA_SOURCE
            dataSource = SC.FixturesDataSource.create();
            SC.Logger.log('Using fixtures data source.');
        }

        // Create the store itself.
        var store = SC.Store.create();
        store.set('dataSource', dataSource);


        this.set('store', store);
    },
        /**
     * Retrieves a single record from the store.
     *
     * @param {SC.Record} recordType The type of the record to retrieve.
     * @param {String|Number} id The ID of the record to retrieve.
     *
     * @returns {CoreOrion.Record} The instantiated record.
     */
    findRecord: function(recordType, id) {
        return this.get('store').find(recordType, id);
    },

    /**
     * Retrieves all records from the store matching the given query.
     *
     * @param {SC.Query} q The query to apply.
     *
     * @returns {SC.RecordArray} A SC.RecordArray of matching records.
     */
    findRecords: function(q) {
        return this.get('store').find(q);
    },

    /**
     * Creates a new record in the store.
     *
     * @param {CoreOrion.Record} recordType The type of the record.
     * @param {Hash} dataHash The data hash used to seed the new record (optional).
     *
     * @returns {CoreOrion.Record} A new record instance.
     */
    createRecord: function(recordType, dataHash) {
        if (!dataHash) dataHash = {};

        // Assign the new record a negative integer ID
        if (dataHash.id === undefined) {
            dataHash.id = this._currentRecordID + '';
            this._currentRecordID--;
        }

        return this.get('store').createRecord(recordType, dataHash);
    },

    destroyRecord: function(rec) {
        if (SC.none(rec) || !SC.kindOf(rec, SC.Record)) return NO;
        var sk = rec.get('storeKey');
        this.get('store').destroyRecord(null, null, sk);
        return YES;
    }
});
CoreTextwerk.Store = SC.Store.extend({

});
