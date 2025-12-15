const path = require('node:path');
const { readJSON, writeJSON } = require('../utils/jsonStorage');
const sendResponse = require('../utils/sendResponse');
const bodyParser = require('../utils/bodyParser');
const parseUrl = require('../utils/parseUrl');

const dataPath = path.join(__dirname, '../../data/products.json');
module.exports = async function productsRoutes(req, res) {
    const { resource, id } = parseUrl(req);
    if (resource !== 'products') return;
    if (req.method === 'GET' && !id) {
        const products = readJSON(dataPath);
        return sendResponse(res, 200, products);
    }
    if (req.method === 'GET' && id) {
        const products = readJSON(dataPath);
        const product = products.find(p => p.id === id);
        if (!product) {
            return sendResponse(res, 404, { message: 'Product not found' });
        }
        return sendResponse(res, 200, product);
    }
    if (req.method === 'POST' && !id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, 400, { message: 'Request body is required' });
            }
            const { title, price, inStock } = body;
            if (!title || typeof price !== 'number' || typeof inStock !== 'boolean') {
                return sendResponse(res, 400, {
                    message: 'title, numeric price and boolean inStock are required'
                });
            }
            const products = readJSON(dataPath);
            const lastId = products.length
                ? Math.max(...products.map(p => Number(p.id)))
                : 0;
            const now = new Date().toISOString();
            const newProduct = {
                id: (lastId + 1).toString(),
                title,
                price,
                inStock,
                createdAt: now,
                updatedAt: now
            };
            products.push(newProduct);
            writeJSON(dataPath, products);
            return sendResponse(res, 201, newProduct);
        } catch (err) {
            return sendResponse(res, 400, {
                message: err.message || 'Invalid JSON'
            });
        }
    }

    if (req.method === 'PUT' && id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, 400, { message: 'Request body is required' });
            }
            const { title, price, inStock } = body;
            if (!title || typeof price !== 'number' || typeof inStock !== 'boolean') {
                return sendResponse(res, 400, {
                    message: 'PUT requires title, price and inStock'
                });
            }
            const products = readJSON(dataPath);
            const index = products.findIndex(p => p.id === id);
            if (index === -1) {
                return sendResponse(res, 404, { message: 'Product not found' });
            }
            const updatedProduct = {
                ...products[index],
                title,
                price,
                inStock,
                updatedAt: new Date().toISOString()
            };
            products[index] = updatedProduct;
            writeJSON(dataPath, products);
            return sendResponse(res, 200, updatedProduct);
        } catch (err) {
            return sendResponse(res, 400, {
                message: err.message || 'Invalid JSON'
            });
        }
    }

    if (req.method === 'PATCH' && id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, 400, { message: 'Request body is required' });
            }
            const products = readJSON(dataPath);
            const product = products.find(p => p.id === id);
            if (!product) {
                return sendResponse(res, 404, { message: 'Product not found' });
            }
            const { title, price, inStock } = body;
            if (title !== undefined) product.title = title;
            if (price !== undefined) {
                if (typeof price !== 'number') {
                    return sendResponse(res, 400, { message: 'price must be a number' });
                }
                product.price = price;
            }
            if (inStock !== undefined) {
                if (typeof inStock !== 'boolean') {
                    return sendResponse(res, 400, { message: 'inStock must be boolean' });
                }
                product.inStock = inStock;
            }
            product.updatedAt = new Date().toISOString();
            writeJSON(dataPath, products);
            return sendResponse(res, 200, product);

        } catch (err) {
            return sendResponse(res, 400, {
                message: err.message || 'Invalid JSON'
            });
        }
    }

    if (req.method === 'DELETE' && id) {
        const products = readJSON(dataPath);
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            return sendResponse(res, 404, { message: 'Product not found' });
        }
        products.splice(index, 1);
        writeJSON(dataPath, products);
        return sendResponse(res, 204);
    }
    return sendResponse(res, 405, { message: 'Method Not Allowed' });
};
