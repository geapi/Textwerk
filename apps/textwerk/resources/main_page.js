// ==========================================================================
// Project:   Textwerk - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk Textwerk SCUI LinkIt*/

sc_require('views/tool_bars');

// This page describes the main user interface for your application.
Textwerk.mainPage = SC.Page.design({

    invalidBrowserPane: SC.Pane.design({
        childViews: 'title main'.w(),

        title: SC.View.design({
            layout: {left: 0, top: 0, right: 0, height: 56},
            classNames: ['header'],
            render: function(context, firstTime) {
                context = context.begin('div')
                        .addClass('logo')
                        .text('family tree')
                        .end();
                context = context.begin('div')
                        .addClass('blurb')
                        .text('a scui linkit example')
                        .end();
                context = context.begin('div')
                        .addClass('leaves')
                        .end();
            }
        }),

        main: SC.View.design({
            layout: {left: 0, top: 56, right: 0, bottom: 0},
            render: function(context, firstTime) {
                context = context.begin('div')
                        .addClass('apology')
                        .text('Sorry, Linkit is designed for desktop application for now and we are working on adding mobile support...')
                        .end();
            }
        })
    }),
    // The main pane is made visible on screen as soon as your app is loaded.
    // Add childViews to this pane for views to display immediately on page
    // load.
    mainPane: SC.MainPane.design({
        defaultResponder: 'Textwerk.statechart',

        dashboard:  SC.outlet('masterView'),

        childViews: 'masterView'.w(),
        //masterView: Textwerk.oldViews.dashboard
        masterView: SC.WorkspaceView.extend({

            topToolbar: Textwerk.toolBars.top,
            contentView: SC.View.design({ // tasksList/BottomBar

                childViews: 'tasksSceneView bottomToolbar'.w(),

                tasksSceneView: SC.SceneView.design({

                    layout: { top: 0, bottom: 0, left: 0, right: 0 },
                    scenes: ['Textwerk.oldViews.canvasListView', 'Textwerk.dashboardPage.dashboard'],
                    transitionDuration: 0,
                    //nowShowing: 'Textwerk.oldViews.canvasListView'
                    nowShowing: 'Textwerk.dashboardPage.dashboard'

                }),
                 bottomToolbar:Textwerk.toolBars.bottom
            })



        })


    })
});

