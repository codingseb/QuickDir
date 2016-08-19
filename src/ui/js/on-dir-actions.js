exports.showDir = function(){
    try{
        let cmdToRun = openDirCommand + '"' + field.val() + '"';
        console.log(cmdToRun);
        childProcess.exec(cmdToRun, function(error, stdout, stderr){ });
    }
    catch(ex) {
        console.log(ex);
    }
};

exports.cmdOnDir = function(){
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
};