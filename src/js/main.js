let autocompletion = require('./js/dir-autocomplete.js');
let dirutils = require('./js/dir-utils.js');
let openDirCommand = isWin ? 'explorer ' : 'open ';
let cmdCommand = isWin ? "cmd /K cd /d "  : "terminal ";
let childProcess = require("child_process");
let autocompleteActions = require('./js/autocomplete-actions.js');
let onDirActions = require('./js/on-dir-actions.js');

dirutils.init(function(){
    $(function() {
        
        // Set field globaly
        window.field = $(".autocomplete");

        // Set the auto-complete to the field
        field.autocomplete({
            source: autocompletion.autocompleteeval,
            minLength: 0,
            delay: 0,
            open: autocompleteActions.onOpen,
            close: autocompleteActions.onClose,
            select: autocompletion.autocompleteselect
        })
        .focus(function(){
            $(this).autocomplete("search", this.value);
            return false;
        }).blur(function(){
            field.focus();
            return false;
        }).keydown(onkeydown);

        // Focus the field as soon as the app is on
        field.focus();
    });
});

function onkeydown(e){
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
}

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
