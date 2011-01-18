// ==========================================================================
// Project:   Textwerk
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CoreTextwerk, Textwerk */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
Textwerk = SC.Application.create(
/** @scope Textwerk.prototype */
 {

    NAMESPACE: 'Textwerk',
    VERSION: '0.1.2',

		ds:null,


    _distinctYears: null,
	loadingFromFixtures: NO,

    // method to pull the distinct years out of the paper collection
	// should be offloaded to backend maybe
    getDistinctYears: function() {
        if (this._distinctYears) {
			console.log("Already have the years");
        }
        else {
			console.log("Computing the years");
            var docs = this.store.find(Textwerk.AclPaper);
            this._distinctYears = [];
            docs.forEach(function(item) {
				var _itemYear = item.get('year');
				//console.log("Year: "+_itemYear + " array length: "+ this._distinctYears.length + " indexOf: "+ this._distinctYears.indexOf(_itemYear));
                	if(this._distinctYears.indexOf(_itemYear) == -1){
						//console.log("found a new year: >"+ _itemYear+"<");
						this._distinctYears[this._distinctYears.length] = _itemYear; 
					}
                return YES;
            },
            this);
			console.log("Total (distinct) years found: "+this._distinctYears.length);
        }
		return this._distinctYears;
    },





});
