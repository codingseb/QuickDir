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
    this.value = ui.item.value;
    return false;
}

exports.autocompleteeval = autocompleteeval;
exports.autocompleteselect = autocompleteselect;