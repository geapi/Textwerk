/**
 * User: geapi
 * Date: Jan 15, 2011
 * Time: 4:47:05 PM
 */
/*globals CoreTextwerk, Textwerk, ki*/

Textwerk.DetailsState = Ki.State.extend({

    initialSubstate: 'details',
    details: Ki.State.design({

        topLevel: function() {
            console.log("top level");
        },
        mediumLevel: function() {
            console.log("medim level");
        },
        detailLevel: function() {
            console.log("detail level");
        }
    })
});
