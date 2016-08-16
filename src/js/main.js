let autocompletion = require('./js/dir-autocomplete.js');
let dirutils = require('./js/dir-utils.js');
let openDirCommand = isWin ? 'explorer ' : 'open ';
let cmdCommand = isWin ? "cmd /K cd /d "  : "terminal ";
let field = null;
let childProcess = require("child_process");
const remote = require('electron').remote;

dirutils.init(function(){
    $(function() {

        field = $(".autocomplete");

        // Set the auto-complete to the field
        field.autocomplete({
            source: autocompletion.autocompleteeval,
            minLength: 0,
            delay: 0,
            close: function(event, ui) {
                try{
                    $(this).autocomplete("search", this.value);
                }
                catch(e){}
            },
            select: autocompletion.autocompleteselect
        })
        .focus(function(){
            $(this).autocomplete("search", this.value);
            return false;
        }).blur(function(){
            field.focus();
            return false;
        });

        // Clear field on Escape key
        field.keydown(onkeydown);

        // Focus the field as soon as the app is on
        field.focus();
    });
});

function onkeydown(e){
    if(e.which === 27){
        clearOrClose();
    }
    else if(e.which === 116){
        showDir();
    }
    else if(e.which === 117){
        cmdOnDir();
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

function showDir(){
    try{
        let cmdToRun = openDirCommand + '"' + field.val() + '"';
        console.log(cmdToRun);
        childProcess.exec(cmdToRun, function(error, stdout, stderr){ });
    }
    catch(ex) {
        console.log(ex);
    }
}

function cmdOnDir(){
    try{
        childProcess.spawn('cmd', {
            cwd: field.val(),
            detached: true,
            shell: true
        });
    }
    catch(ex) {
        console.log(ex);
    }
}


