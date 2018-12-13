const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '..');
const staticDir = path.join(rootDir, 'src/site/static');
const siteDir = path.join(rootDir, 'dist/site');
const compiledDir = path.join(siteDir, 'compiled')
const jsFiles = ['index', 'index2'];

async function build(inputOptions, outputOptions) {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}

const promises = jsFiles.map (name => {
    return build ({
        input: path.join(compiledDir, name+'.js'),
        plugins: [commonjs(), resolve({
            moduleDirectory: path.join(rootDir, 'node_modules')
        }), uglify.uglify()]
    }, {
        file: path.join(siteDir, 'js', name+'.js'),
        name: name,
        format: 'umd'
    });
});

function deleteFolderRecursive(dirpath) {
    if( fs.existsSync(dirpath) ) {
        fs.readdirSync(dirpath).forEach(function(file) {
            var curPath = path.join(dirpath, file);
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dirpath);
    }
}

function mkdirsSync(dirpath) { 
    if (!fs.existsSync(dirpath)) {
        let pathtmp;
        dirpath.split(/[/\\]/).forEach(function (dirname) {
            pathtmp = pathtmp ? path.join(pathtmp, dirname) : dirname;
            if (!fs.existsSync(pathtmp)) {
                fs.mkdirSync (pathtmp)
            }
        });
    }
}

function copyFolderRecursive(src, dst) {
    if( fs.existsSync(src) ) {
        if ( !fs.existsSync(dst) ) {
            mkdirsSync (dst)
        }
        fs.readdirSync(src).forEach(function(file) {
            var curPath = path.join(src, file);
            var dstPath = path.join(dst, file);
            if(fs.statSync(curPath).isDirectory()) { // recurse
                copyFolderRecursive(curPath, dstPath);
            } else {
                fs.copyFileSync (curPath, dstPath);
            }
        });
    }
}

Promise.all (promises).then (result => {
    deleteFolderRecursive (compiledDir);
    copyFolderRecursive (staticDir, siteDir);
    process.exit(0);
}).catch (reason => {
    console.error (reason);
    process.exit(-1);
});

