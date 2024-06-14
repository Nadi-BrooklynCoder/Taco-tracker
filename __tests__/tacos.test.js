const { addItem, getCartTotal, cancelCart } = require('../src/tacos');
const { readJSONFile } = require('../src/helpers');
const path = './data';
const fileName = 'tacos.json';