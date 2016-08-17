function onOpen(event, ui){
    let autocompleteselect = $('#ui-id-1');
    let offset = autocompleteselect.offset();
    let bottom = offset.top + autocompleteselect.outerHeight();
    let win = remote.getCurrentWindow();

    win.setSize(win.getSize()[0], bottom);
}

function onClose(event, ui) {
    try{
        $(this).autocomplete("search", this.value);
    }
    catch(e){}
}