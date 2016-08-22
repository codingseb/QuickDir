exports.onOpen = function(event, ui){
    let autocompleteselect = $('#ui-id-1');
    let offset = autocompleteselect.offset();
    let bottom = offset.top + autocompleteselect.outerHeight();
    let win = remote.getCurrentWindow();

    win.setSize(win.getSize()[0], bottom);
};

exports.onClose = function(event, ui) {
    try{
        field.refresh();
    }
    catch(e){}
};