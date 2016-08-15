let dirutils = require('./dir-utils.js');

function autocompleteeval (request, response){
    let levels = dirutils.split(request.term);
    let data = [];
    let current = levels.pop();

    if(levels.length <= 0){
        data = dirutils.getDrivesNames(current);
    }
    else {
        data = dirutils.getSubDirs(levels, current);
    }
    response(data);
}

function autocompleteselect(event, ui){
    let terms = dirutils.split( this.value );

    terms.pop();

    if(terms.length > 0 ){
        terms.push(dirutils.last(ui.item.value));
        terms.push("");
    }
    else {
        terms.push(ui.item.value);
    }

    this.value = terms.join(dirutils.separator);
    return false;
}

exports.autocompleteeval = autocompleteeval;
exports.autocompleteselect = autocompleteselect;