let autocompletion = require('./js/dir-autocomplete.js');
let dirutils = require('./js/dir-utils.js');
let isWin = /^win/.test(process.platform);
let openDirCommand = isWin ? 'explorer ' : 'open ';
let cmdCommand = isWin ? "cmd /K cd /d "  : "terminal ";
let field = null;
let exec = require("child_process").exec;
let remote = require('electron').remote;

dirutils.init(function(){
    $(function() {
        let body = $("body");
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
            $(this).autocomplete("search", "");
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
        field.val('');
        field.autocomplete("close");
    }
    else if(e.which === 116){
        executeondir(openDirCommand);
    }
    else if(e.which === 117){
        remote.getGlobal('executeondir')(cmdCommand);
    }
}

function executeondir(cmd){
    try{
        let cmdToRun = cmd + '"' + field.val() + '"';
        console.log(cmdToRun);
        exec(cmdToRun, function(code, stdout, stderr){
            console.log({code, stdout, stderr});
        });
    }
    catch(ex) {}
}
