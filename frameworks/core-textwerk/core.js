/**
 * Date: Jan 13, 2011
 * Time: 6:43:04 AM
 * To change this template use File | Settings | File Templates.
 */
/* globals CoreTextwerk */
CoreTextwerk = SC.Object.create({

    /*
     * Textwerk data source types
     */
    REMOTE_DATA_SOURCE: 0x0001,
    FIXTURES_DATA_SOURCE: 0x0002,
    dataSourceType: 0x0001,

    initializeStore: function() {

        // Create the appropriate data source.
        // Create the appropriate data source.
        var dataSource;
        if (CoreTextwerk.get('dataSourceType') === CoreTextwerk.REMOTE_DATA_SOURCE) {
            dataSource = CoreTextwerk.Corpus.create();
            SC.Logger.log('Using caching remote data source.');
        }
        else { // FIXTURES_DATA_SOURCE
            dataSource = SC.FixturesDataSource.create();
            SC.Logger.log('Using fixtures data source.');
        }

        // Create the store itself.
        var store = SC.Store.create();
        store.set('dataSource', dataSource);


        this.set('store', store);
    }
});
CoreTextwerk.Store = SC.Store.extend({

});
