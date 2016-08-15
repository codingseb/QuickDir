let drivelist = require('drivelist');
var isWin = /^win/.test(process.platform);
let separator = isWin ? '\\' : '/';
let drivesNames = '';

window.glob = require('glob');

drivelist.list(function(error, disks){
    if(error){
        throw error;
    }

    drivesNames = disks.map((disk) => disk.name + separator);
});

// Split the autocomplet eval with chars \ / or < >
function split( val ) {
    return val.split( /[<>\\/]\s*/ );
}

function last( val ){
    let arr = split(val);
    
    return (val.endsWith('/'))  ? arr[arr.length - 2] : arr[arr.length -1];
}

function autocompleteeval (request, response){
    let levels = split(request.term);
    let data = [];
    let current = levels.pop();

    if(levels.length <= 0){
        data = drivesNames;
    } else {
        
        let root = levels[0];
        let pattern = levels.slice(1).join('/') + '/' + '*/';

        data = glob.sync(pattern, {root: root});
    }

    let filteredData = $.grep(data, (s) => last(s.toLowerCase())
        .startsWith(current.toLowerCase()));

    response(filteredData);
}

function autocompleteselect(event, ui){
    let terms = split( this.value );

    // remove the current input
    terms.pop();
    // add the selected item
    terms.push( ui.item.value );
    // add placeholder to get the comma-and-space at the end

    this.value = terms.join(separator);
    return false;
}

$(function() {

    let field = $(".autocomplete");

    field.autocomplete({
        search: function () {},
        source: autocompleteeval,
        minLength: 0,
        focus: function() { return false; },
        select: autocompleteselect
    });

    field.focus();
});