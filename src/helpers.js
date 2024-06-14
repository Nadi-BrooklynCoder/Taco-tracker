//helpers.js

const { readFileSync, writeFileSync } = require("node:fs");
const { nanoid } = require('nanoid');

const readJSONFile = (path, fileName) => {
    const collection = readFileSync(`${path}/${fileName}`, 'utf8');
    const data = JSON.parse(collection);
    return data.tacos || [];
};

const writeJSONFile = (path, fileName, data) => {
    const jsonData = JSON.stringify({ tacos : data}, 0, 2);
    writeFileSync(`${path}/${fileName}`, jsonData, 'utf-8')
}

const generateId = () => {
    return nanoid(4);
}

module.exports = { readJSONFile, writeJSONFile, generateId};