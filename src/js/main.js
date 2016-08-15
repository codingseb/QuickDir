let drivelist = require('drivelist');
var isWin = /^win/.test(process.platform);
let separator = isWin ? '\\' : '/';
let drivesNames = '';

drivelist.list(function(error, disks){
    if(error){
        throw error;
    }

    drivesNames = disks.map((disk) => disk.name + separator);
});

// Split the autocomplete eval with chars \ / or < >
function split( val ) {
    return val.split( /[<>\\/]\s*/ );
}

function last( val ){
    let arr = split(val);

    return (val.endsWith('/'))  ? arr[arr.length - 2] : arr[arr.length -1];
}

function getSubDirs(levels, current){
    let root = levels.join('/');
    let pattern = '/' + current + '*/';

    console.log({root: root, pattern: pattern});

    return glob.sync(pattern, {root: root, nocase: true});
}

function autocompleteeval (request, response){
    let levels = split(request.term);
    let data = [];
    let current = levels.pop();

    if(levels.length <= 0){
        data = drivesNames;
    }
    else {
        data = getSubDirs(levels, current);
    }
    response(data);
}

function autocompleteselect(event, ui){
    let terms = split( this.value );

    terms.pop();

    if(terms.length > 0 ){
        terms.push(last(ui.item.value));
        terms.push("");
    }
    else {
        terms.push(ui.item.value);
    }

    this.value = terms.join(separator);
    return false;
}

$(function() {

    let field = $(".autocomplete");

    // Set the auto-complete to the field
    field.autocomplete({
        source: autocompleteeval,
        minLength: 0,
        focus: function() { return false; },
        select: autocompleteselect
    });

    // Clear field on Escape key
    field.keydown(function (e) {
        if(e.which === 27){
            field.val('');
        }
    });

    // Focus the field as soon as the app is on
    field.focus();
});