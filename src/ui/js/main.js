let autocompletion = require('./js/dir-autocomplete.js');
let dirutils = require('./js/dir-utils.js');
let openDirCommand = isWin ? 'explorer ' : 'open ';
let cmdCommand = isWin ? "cmd /K cd /d "  : "terminal ";
let childProcess = require("child_process");
let fieldActions = require('./js/field-actions.js');
let onDirActions = require('./js/on-dir-actions.js');
let autocompleteActions = require('./js/autocomplete-actions.js');

dirutils.init(function(){
    $(function() {
        
        // Set field globaly
        window.field = $(".autocomplete");

        field.refresh = function(){
            field.autocomplete('search', field.val());
        };

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
            field.refresh();
            return false;
        }).blur(function(){
            field.focus();
            return false;
        }).keydown(fieldActions.onkeydown);

        // Focus the field as soon as the app is on
        field.focus();

        remote.require('./init-time').initTimeMeasure();
    });
});
