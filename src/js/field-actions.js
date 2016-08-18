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
    let fieldVal = field.val();
    let favEqArray = fieldVal.split('=');
    let favGtArray = fieldVal.split('>');

    console.log({fieldVal, favEqArray, favGtArray});
    if(favEqArray.length === 2
    && fs.existsSync(favEqArray[1])
    && favEqArray[0] !== ''){
        setFav(favEqArray[0], favEqArray[1]);
    }
    else if(favGtArray.length === 2
    && fs.existsSync(favGtArray[0])
    && favGtArray[1] !== ''){
        setFav(favGtArray[1], favGtArray[0]);
    }
}

function setFav(fav, path){
    favorites.set(fav, path);
    field.val(fav);
    field.autocomplete('search', field.val());
}