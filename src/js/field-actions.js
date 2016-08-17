let onDirActions = require('./on-dir-actions.js');

exports.onkeydown = function (e){
    // On Escape
    if(e.which === 27){
        clearOrClose();
    }
    // On F5
    else if(e.which === 116){
        onDirActions.showDir();
    }
    // On F6
    else if(e.which === 117){
        onDirActions.cmdOnDir();
    }
};

function clearOrClose(){
    if(field.val() === ''){
        remote.getCurrentWindow().close();
    }
    else{
        clearField();
    }
}

function clearField(){
    field.val('');
    field.autocomplete("close");
}