let onDirActions = require('./on-dir-actions.js');

exports.onkeydown = function (e){
    // On Escape
    if(e.which === 27){
        clearOrMin();
    }
    // On Enter
    else if(e.which === 13){
        checkAddFav();
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

function clearOrMin(){
    if(field.val() === ''){
        remote.getCurrentWindow().minimize();
    }
    else{
        clearField();
    }
}

function clearField(){
    field.val('');
    field.autocomplete("close");
}

function checkAddFav(){
    let favArray = field.val().split('=');

    if(favArray.length === 2
        && fs.existsSync(favArray[1])
        && favArray[0] !== ''){
        favorites.set(favArray[0], favArray[1]);
        field.val(favArray[0]);
        field.autocomplete('search', field.val());
    }
}