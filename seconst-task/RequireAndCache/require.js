const fs = require('fs');
const path = require('path');
myRequire.cache = {};

function myRequire(moduleName) {
    const absPath = path.resolve(moduleName);
    const dirName = path.dirname(absPath);
    if (myRequire.cache[absPath]) {
        return myRequire.cache[absPath].exports;
    }
    const module = {
        exports: {},
        filename: absPath,
        dirname: dirName
    }
    myRequire.cache[absPath] = module;
    const buffer = fs.readFileSync(absPath, "utf8");
    const wrap = new Function(
        "exports",
        "require",
        "module",
        "__filename", 
        "__dirname", 
        buffer
    );
    wrap(module.exports, myRequire, module, module.filename, module.dirname);
    return module.exports;
}
