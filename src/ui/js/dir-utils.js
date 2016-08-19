let drivelist = require('drivelist');
let separator = isWin ? '\\' : '/';
let drivesNames = '';
const splitRegexp =  /[\\/]\s*/;
const noMultiStarRegExp = /[*][*]+/;

function init(callback){
    drivelist.list(function(error, disks){
        if(error){
            throw error;
        }

        drivesNames = disks.map((disk) => disk.name + separator);
        setTimeout(checkDriveListChanges, 5000);
        callback();
    });
}

function checkDriveListChanges(){
    drivelist.list((error, disks) => {
        if(error){
            throw error;
        }

        currentdrivesNames = disks.map((disk) => disk.name + separator);

        if(JSON.stringify(drivesNames) !== JSON.stringify(currentdrivesNames)){
            console.log({event: 'Drives changed', currentdrivesNames, drivesNames});
            drivesNames = currentdrivesNames;
            field.autocomplete('search', field.val());
        }

        setTimeout(checkDriveListChanges, 5000);
    });
}

// Split the autocomplete eval with chars \ / or < >
function split( val ) {
    return val.split(splitRegexp);
}

function last( val ){
    let arr = split(val);

    return (val.endsWith('/'))  ? arr[arr.length - 2] : arr[arr.length -1];
}

function getSubDirs(levels, current){
    let root = levels.join('/');
    let pattern = '/' + current + '*/'.replace(noMultiStarRegExp, '*');

    return glob.sync(pattern, {root: root, nocase: true})
        .map(path => split(path).join(separator));
}

function getDrivesNames(current){
    return $.grep(drivesNames, dn => dn.toLowerCase().startsWith(current.toLowerCase()));
}

exports.init = init;
exports.split = split;
exports.last = last;
exports.getSubDirs = getSubDirs;
exports.getDrivesNames = getDrivesNames;
exports.separator = separator;