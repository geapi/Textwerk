/**
 * User: geapi
 * Date: Jan 15, 2011
 * Time: 5:22:01 PM
 */
/*globals CoreTextwerk, Textwerk */

Textwerk.dashboardController = SC.ObjectController.create(
/** @scope Textwerk.dashboardController.prototype */ {
     openDashboard: function() {
        Textwerk.getPath('mainPage.mainPane').append();
        Textwerk.setPath('mainPage.mainPane.dashboard.nowShowing', 'Textwerk.dashboardPage.dashboard');

    }
});

