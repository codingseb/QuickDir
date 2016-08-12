let drivelist = require('drivelist');
let glob = require('glob');
var isWin = /^win/.test(process.platform);
let separator = isWin ? '\\' : '/';
let drivesNames = '';

drivelist.list(function(error, disks){
    if(error){
        throw error;
    }

    drivesNames = disks.map((disk) => disk.name + separator);
});

$(function() {

    let field = $(".autocomplete");

    function split( val ) {
        return val.split( /[<\\/]\s*/ );
    }

    field.autocomplete({
        search: function () {},
        source: function( request, response ) {
            let levels = split(request.term);
            let data = [];
            let current = levels.pop();

            if(levels.length <= 0){
                data = drivesNames;
            } else {
                data = fs.readdirsync(levels.join(separator));
            }

            response($.ui.autocomplete.filter(
                data,
                current));
        },
        minLength: 0,
        focus: function() {
            return false;
        },
        select: function( event, ui ) {
            let terms = split( this.value );

            // remove the current input
            terms.pop();
            // add the selected item
            terms.push( ui.item.value );
            // add placeholder to get the comma-and-space at the end
            // terms.push( "" );
            this.value = terms.join(separator);
            return false;
        }

    });

    field.focus();
});