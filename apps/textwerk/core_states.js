/**
 * A mixin that defines all of the state transitions.
 *
 * @author Georg Apitz
 */
/*globals ki, Textwerk sc_require */
sc_require('states/dashboard');
sc_require('states/details');
sc_require('states/search');

Textwerk.mixin({

    statechart: Ki.Statechart.create({

    // Set tracing on to debug statecharts
    trace: NO,

    rootState: Ki.State.design({

      initialSubstate: 'dashboard',

      // State for general application interaction
      dashboard: Ki.State.plugin('Textwerk.DashboardState'),

      // State for the search
      search: Ki.State.plugin('Textwerk.SearchState'),

      // State for the detail views
      details: Ki.State.plugin('Textwerk.DetailsState')

    })

  })

});