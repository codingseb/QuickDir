let autocompletion = require('./js/dir-autocomplete.js');
let dirutils = require('./js/dir-utils.js');

dirutils.init(function(){
    $(function() {
        let body = $("body");
        let field = $(".autocomplete");

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
        field.keydown(function (e) {
            if(e.which === 27){
                field.val('');
            }
        });

        // Focus the field as soon as the app is on
        field.focus();
    });
});
