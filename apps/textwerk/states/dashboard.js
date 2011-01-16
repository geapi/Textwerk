/**
 * State to handle globally available actions

 */
/*globals CoreTextwerk, Textwerk, ki*/

Textwerk.DashboardState = Ki.State.extend({

    initialSubstate: 'ready',
    ready: Ki.State.design({

        enterState: function() {
            CoreTextwerk.initializeStore();
            Textwerk.loadData();
            Textwerk.dashboardController.openDashboard();
        },

        search: function() {
            this.gotoState('search');
        }
    })

});