var b = browserify({ basedir: __dirname });
b.require('./client.js', { expose: 'lbclient '});

boot.compileToBrowserify({ appRootDir: __dirname }, b);

var bundlePath = path.resolve(__dirname, 'browser.bundle.js');
b.pipe(fs.createWriteStream(bundlePath));