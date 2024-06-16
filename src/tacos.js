//tacos.js
const fs = require('fs');
const cartData = './data/cart.json'
const { generateId, readJSONFile, writeJSONFile }= require('./helpers')
let cart = [];

fs.existsSync(cartData) ? null : fs.writeFileSync(cartData, JSON.stringify([]));

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
    let cart;
    try {
        cart = JSON.parse(fs.readFileSync(cartData, 'utf8'));
    } catch (error) {
        console.error('Error reading cart data:', error);
        return { 
            message: 'Failed to read cart data. Please check the cart file.',
            totals: { totalPrice: 0, totalItems: 0 } 
        };
    }
    
    const taco = tacos.find(t => t.id === tacoId);
    if(!taco) {
        return { 
            message: 'Taco not found',
            totals: { totalPrice: 0, totalItems: 0 }
        };
    }

    const parsedQuantity = parseInt(quantity, 10);
    const cartIndex = cart.findIndex(item => item.id === tacoId);

    if(cartIndex !== -1) {
        cart[cartIndex].quantity += parsedQuantity;
        cart[cartIndex].price = (parseFloat(taco.price) * cart[cartIndex].quantity).toFixed(2);
    } else {
        cart.push({ ...taco, quantity: parsedQuantity, price: (parseFloat(taco.price) * parsedQuantity).toFixed(2) });
    }

    fs.writeFileSync(cartData, JSON.stringify(cart));
    
    const totals = cart.reduce((total, item) => {
        return {
            totalPrice: total.totalPrice + parseFloat(item.price),
            totalItems: total.totalItems + item.quantity
        };
    }, { totalPrice: 0, totalItems: 0 });

    return { cart, totals };
};




const cancelCart = () => {
    fs.writeFileSync(cartData, JSON.stringify([]));
    return { message: 'Cart has been emptied'};
}


module.exports = { create, index, show, destroy, edit, addItem, cancelCart }

