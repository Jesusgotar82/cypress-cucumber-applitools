#!/usr/bin/env node
var fs = require('fs');
var fileInputPath = 'jsonlogs/messages.ndjson';
var fiOutputPath = 'jsonlogs/myLog.json'

fs.readFile(fileInputPath, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        var data = JSON.stringify(data.toString().trim().split('\n').map(JSON.parse));
        fs.writeFile(fiOutputPath, data, function (err) {
            if (err) return console.log(err);
        });
        return;
    }
});