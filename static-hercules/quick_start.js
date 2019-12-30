var fs = require("fs");

var rubbish = 10;

var tempPage = "./template/page/template.html";
var tempIndex = "./template/js/index.vue";
var tempFiles = [{
        file: "main.js",
        path: "./template/js/main.js"
    },
    {
        file: "App.vue",
        path: "./template/js/App.vue"
    }
];
var tempFolder = ["components", "config", "images", "views"];

var args = process.argv.splice(2);

if (args.length < 1) {
    log("Please input project name!");
    return;
};

var project = args[0];

var proPage = "./page/" + project + ".html";

var proFolder = "./src/" + project;

var proPath = proFolder + "/";

var indexPath = proPath + "/views/index";

var indexFile = indexPath + "/index.vue";

doTask();

function createProFolder(path) {
    if (fs.existsSync(path)) {
        log('Folder has already existed...');
    } else {
        fs.mkdirSync(path);
        log('Creating project folder successfully...');
    }
}

function createFolders() {
    for (var i = 0; i < tempFolder.length; i++) {
        var j = i;
        var path = proPath + tempFolder[j];
        if (fs.existsSync(path)) {
            log('Folder has already existed...');
        } else {
            fs.mkdirSync(path);
            log('Creating folder successfully...');
        }
    }
}

function createPage() {
    fs.readFile(tempPage, function (err, data) {
        log("Reading template page...");
        if (err) throw err;
        writeFile(data, proPage);
    });
}

function writeFile(data, path, cb) {
    fs.writeFile(path, data, function (error) {
        if (error) {
            throw error;
        } else {
            log("Creating file successfully...");
            if (cb) cb();
        }
    });
}

function copyFiles(i) {
    if (i < tempFiles.length) {
        var file = tempFiles[i].file;
        var path = tempFiles[i].path;
        var out = proPath + file;
        fs.readFile(path, function (err, data) {
            log("Reading template file...");
            if (err) throw err;
            i++;
            writeFile(data, out, copyFiles(i));
        });
    } else {
        log("Copying files successfully...")
    }
}

function createIndex() {
    if (fs.existsSync(indexPath)) {
        log('Folder has already existed...');
    } else {
        fs.mkdirSync(indexPath);
        log('Creating index folder successfully...');
    }
    fs.readFile(tempIndex, function (err, data) {
        log("Reading template file...");
        if (err) throw err;
        writeFile(data, indexFile);
    });
}

function log(msg) {
    console.log(msg);
    var e = "";
    for (var i = 0; i < rubbish; i++) {
        e += ">";
    }
    console.log(e);
    rubbish += 3;
}

function doTask() {
    createPage();
    createProFolder(proFolder);
    createFolders();
    copyFiles(0);
    createIndex();
}