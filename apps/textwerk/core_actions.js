// ==========================================================================
// Project:   Textwerk - Core Actions
// Copyright: ©2010 Georg Apitz
// @author Georg Apitz
// ==========================================================================
/*globals CoreTextwerk, Textwerk */

/** @namespace


 @extends SC.Object
 */

Textwerk.mixin({
    _citationNetworkShowing: NO,
    _pageRankShowing: NO,
    _collaborationNetworkShwoing: NO,
    deleteSelectedMembers: function() {
        var selection, toRemove, collection,
                len, confirmStr, alertController,
                fc = Textwerk.collectionController;

        selection = Textwerk.collectionContentController.get('selection');
        toRemove = [];
        collection = fc.get('content');

        if (selection) {
            len = selection.get('length');
            confirmStr = (len === 1) ? "Are you sure you want to delete this member" : "Are you sure you want to delete these members";
            alertController = SC.Object.create({

                button1Action: function() {
                    // copy to a separate array since deleting elements changes the selection set itself
                    if (selection && selection.isEnumerable) {
                        selection.forEach(function(element) {
                            toRemove.push(element);
                        });
                    }

                    if (collection) {
                        toRemove.forEach(function(member) {
                            collection.removeMember(member);
                        });
                    }
                },

                alertPaneDidDismiss: function(pane, status) {
                    switch (status) {
                        case SC.BUTTON1_STATUS:
                            if (this.button1Action) this.button1Action();
                            break;

                        case SC.BUTTON2_STATUS:
                            if (this.button2Action) this.button2Action();
                            break;
                    }
                }
            });

            SC.AlertPane.warn("Delete?", confirmStr, '', "Delete", "Cancel", '', alertController);
        }
    },


    loadData: function() {

        var store = CoreTextwerk.get('store');
        Textwerk.collectionsController.set('content', store.find(CoreTextwerk.Collection));
        
        //Textwerk.authorsController.set('content', store.find(CoreTextwerk.Author));
        //Textwerk.venuesController.set('content', store.find(CoreTextwerk.Venue));
        //Textwerk.affiliationsController.set('content', store.find(CoreTextwerk.Affiliation));
        store.find(CoreTextwerk.Paper);
        console.log("at the end of load data, store was: " +store);
    },
    showCitationNetwork: function(){
        return this._citationNetworkShowing = !this._citationNetworkShowing;

    },
    showPageRank: function(){
        return this._pageRankShowing = !this._pageRankShowing;

    },
    showCollaborationNetwork: function(){
        return this._collaborationNetworkShwoing = !this._collaborationNetworkShwoing;

    }
});