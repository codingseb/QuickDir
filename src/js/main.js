let navigation = require('./js/dir-autocomplete.js');

$(function() {

    let field = $(".autocomplete");

    // Set the auto-complete to the field
    field.autocomplete({
        source: navigation.autocompleteeval,
        minLength: 0,
        focus: function() { return false; },
        select: navigation.autocompleteselect
    });

    // Clear field on Escape key
    field.keydown(function (e) {
        if(e.which === 27){
            field.val('');
        }
    });

    // Focus the field as soon as the app is on
    field.focus();
});