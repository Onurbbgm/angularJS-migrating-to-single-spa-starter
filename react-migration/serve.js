const http = require('http');
const nodeStatic = require('node-static');
const { cache } = require('webpack');
const fs = require('fs');
const path = require('path');

const prepareDist = () => {
    const publicPath = getEnviromentSetup();
    setEnvironmentUrl(publicPath);
    const fileServer = new nodeStatic.Server('./dist', { gzip: true });

    return fileServer;
};

let env = "qa";

process.argv.forEach(function (val, index, array) {
    if (val.indexOf('=') > 0) {
        const param = val.split('=');
        try {
            if (param[0].toLowerCase() === 'env') {
                env = param[1].toLowerCase();
            }
        } catch (err) {
            console.log(err);
        }
    }
});

const getEnviromentSetup = () => {
    switch (env) {
        case 'dev': {
            return 'http://localhost:9000/';
        }
        case 'qa': {
            return 'https://qa-react.mxmerchant.com/';
        }
        case 'uat': {
            return 'https://uat-react.mxmerchant.com/';
        }
        case 'sandbox': {
            return 'https://sandbox-react.mxmerchant.com/';
        }
        case 'prod': {
            return 'https://react.mxmerchant.com/';
        }
    }
    throw Error('Unknown environment: ' + process.env.NODE_ENV);
}


const setEnvironmentUrl = (publicPath) => {
    // The directory you want to search
    const directoryPath = './dist';

    // The string you want to replace
    const findString = 'ENVIRONMENT_PUBLIC_URL';

    const searchForIn = [
        'dist/remoteEntry.js',
        'dist/Bruno-react-migration.js.map',
        'dist/remoteEntry.js.map',
        'dist/Bruno-react-migration.js'
    ];

    // Read all files in the directory
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }

        // Loop through all the files in the directory
        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);

            if (searchForIn.includes(filePath)) {
                // Read the file
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        return console.error('Unable to read file: ' + err);
                    }

                    if (data.includes(findString)) {
                        console.log('found in: ', filePath);
                    }

                    // Replace the string
                    const result = data.replace(new RegExp(findString, 'g'), publicPath);

                    // Write the file back out
                    fs.writeFile(filePath, result, 'utf8', (err) => {
                        if (err) {
                            return console.error('Unable to write file: ' + err);
                        }
                    });
                });
            }
        });
    })
}

const fileServer = prepareDist();
http.createServer(function(req, res) {
    console.log('serving ', req.url);
    try {
        req.addListener('end', () => {
            try {
                fileServer.serve(req, res);
            } catch (err) {
                console.log({err}, 'Failed to serve file');
            }
        }).addListener('error', (err) => {
            console.log({err}, 'Failed to serve file');
        }).resume();
    } catch (err) {
        console.log({err}, 'Failed to send response');
    }
}).listen(9000);