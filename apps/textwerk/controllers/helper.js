/**
 * User: geapi
 * Date: Jan 22, 2011
 * Time: 3:53:50 PM
 */
/*globals CoreTextwerk, Textwerk */

/** @class

        (Document Your Controller Here)

 @extends SC.ObjectController
 */
Textwerk.helper = SC.ObjectController.create(
    /** @scope Textwerk.documentController.prototype */ {

    computePosition: function(panel, anchor) {
        var wsize = SC.RootResponder.responder.computeWindowSize(),
                wret = { x: 0, y: 0, width: wsize.width, height: wsize.height };
        //debugger
        return this.fitPositionToScreenDefault(wret, panel, anchor);
    },
    /** @private
    re-position rule migrated from old SC.OverlayPaneView.
    shift x, y to optimized picker visibility and make sure top-left corner is always visible.
  */
  fitPositionToScreenDefault: function(w, f, a) {
    // make sure the right edge fits on the screen.  If not, anchor to
    // right edge of anchor or right edge of window, whichever is closer.
    if (SC.maxX(f) > w.width) {
      var mx = Math.max(SC.maxX(a), f.width) ;
      f.x = Math.min(mx, w.width) - f.width ;
    }

    // if the left edge is off of the screen, try to position at left edge
    // of anchor.  If that pushes right edge off screen, shift back until
    // right is on screen or left = 0
    if (SC.minX(f) < 0) {
      f.x = SC.minX(Math.max(a,0)) ;
      if (SC.maxX(f) > w.width) {
        f.x = Math.max(0, w.width - f.width);
      }
    }

    // make sure bottom edge fits on screen.  If not, try to anchor to top
    // of anchor or bottom edge of screen.
    if (SC.maxY(f) > w.height) {
      mx = Math.max((a.y - f.height), 0) ;
      if (mx > w.height) {
        f.y = Math.max(0, w.height - f.height) ;
      } else f.y = mx ;
    }

    // if Top edge is off screen, try to anchor to bottom of anchor. If that
    // pushes off bottom edge, shift up until it is back on screen or top =0
    if (SC.minY(f) < 0) {
      mx = Math.min(SC.maxY(a), (w.height - a.height)) ;
      f.y = Math.max(mx, 0) ;
    }
    return f ;
  }


});