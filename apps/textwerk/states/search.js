/**
 * Date: Jan 15, 2011
 * Time: 4:34:12 PM
 */

/*globals CoreTextwerk, Textwerk, ki*/

Textwerk.SearchState = Ki.State.extend({

    initialSubstate: 'searching',
    searching: Ki.State.design({

        noResults: function() {
            this.gotoState('noResults');
        },
        results: function() {
            this.gotoState('results');
        }
    }),
    notResults: Ki.State.design({
        enterState: function() {
            this.gotoState('dashboard');
        }

    }),
    results: Ki.State.design({
        enterState: function() {
            console.log("found results");
        }
    })
});
