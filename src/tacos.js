//tacos.js

const { generateId, readJSONFile, writeJSONFile }= require('./helpers')
const { nanoid } = require('nanoid');
let cart = [];

const create = (path, fileName, tacoName, tacoType, tacoPrice) => {
    let tacos = readJSONFile(path, fileName);
    const taco = {
        id: generateId(),
        name: tacoName,
        description: tacoType,
        price: parseFloat(tacoPrice).toFixed(2),
    }
    tacos.push(taco);
    writeJSONFile(path, fileName, tacos);
    return tacos;
}

const index = ( path, fileName ) => {
    const tacos = readJSONFile(path, fileName);
    return tacos.length > 0 ? tacos.map((taco) => `${taco.id} ${taco.name}`).join('\n'): 'No tacos found';
}

const show = (path, fileName, tacoId) => {
    const tacos = readJSONFile(path, fileName);
    const taco = tacos.find(taco => taco.id === tacoId);
    return taco || { message: 'Taco not found'}
}

const destroy = (path, fileName, tacoId) => {
    let tacos = readJSONFile(path, fileName);
    const oldLength = tacos.length;

    tacos = tacos.filter(taco => taco.id !== tacoId);
    const writeToFile = oldLength > tacos.length;
    writeToFile ? writeJSONFile(path, fileName, tacos) : null;
    return tacos;
}

const edit = (path, fileName, tacoId, newTacoName, newDescription, newPrice) => {
    let tacos = readJSONFile(path, fileName);
    const index = tacos.findIndex(taco => taco.id === tacoId);

    if(index !== -1) {
        tacos[index] = {
            ...tacos[index],
            name: newTacoName || tacos[index].name,
            description: newDescription || tacos[index].description,
            price: newPrice ? parseFloat(newPrice).toFixed(2) : tacos[index].price,
        };
        writeJSONFile(path, fileName, tacos);
    }
    return tacos;
}

const addItem = (tacoId, quantity, tacos) => {
    const taco = tacos.find(t => t.id === tacoId);
    
    return taco ? (() => {
        const cartItem = cart.find(item => item.id === tacoId);
        const parsedQuantity = parseInt(quantity, 10);
        const parsedPrice = parseFloat(taco.price);

        cartItem ? cartItem.quantity += parsedQuantity : cart.push({ ...taco, price: parsedPrice, quantity: parsedQuantity });
        return cart;
    })() : { message: 'Taco not found'};
    
}

const getCartTotal = () => {
    return cart.reduce((total, item) => {
        const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
        return {
            totalPrice: total.totalPrice + (itemPrice * item.quantity),
            totalItems: total.totalItems + item.quantity
        };
    }, { totalPrice: 0, totalItems: 0 });
};


const cancelCart = () => {
    cart = [];
    return { message: 'Cart has been emptied' };
}


module.exports = { create, index, show, destroy, edit, addItem, getCartTotal, cancelCart }

