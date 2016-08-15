let autocompletion = require('./js/dir-autocomplete.js');
let dirutils = require('./js/dir-utils.js');
let shell = require('shelljs');
let isWin = /^win/.test(process.platform);
let runCmd = isWin ? 'explorer ' : 'open ';
let field = null;

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
        showcurrentdirectory();
    }
}

function showcurrentdirectory(){
    try{
        let cmd = runCmd + '"' + field.val() + '"';
        console.log(cmd);
        shell.exec(cmd, function(code, stdout, stderr){
            console.log({code, stdout, stderr});
        });
    }
    catch(ex) {}
}
