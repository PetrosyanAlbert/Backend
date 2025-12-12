const cache = {};

function myCache(name, moduleFunc) {
    if (cache[name]) {
        return cache[name].exports;
    }
    const module = {
        exports: {}
    }
    cache[name] = module;
    moduleFunc(module, module.exports);
    return module.exports;
}

function deleteFromCache(name) {
    if (cache[name]) {
        delete cache[name];
    } else {
        console.log('Module not found');
    }
}

