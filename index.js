//index.js

const inform = console.log;
const { writeJSONFile, readJSONFile } = require('./src/helpers');
const { create, index, show, destroy, edit, addItem, getCartTotal, cancelCart } = require('./src/tacos');
const path = './data';
const fileName = 'tacos.json'

const run = () => {
    const action = process.argv[2];
    let tacoName;
    let tacoDescription;
    let tacoPrice;
    let tacoId;
    let writeToFile = false;
    let updatedTacos = [];
;
    switch(action) {
        case "index":
            const tacoList = index(path, fileName);
            inform(tacoList);
            break;
        case "create":
            tacoName = process.argv[3];
            tacoDescription = process.argv[4];
            tacoPrice = process.argv[5];
            writeToFile = tacoName && tacoDescription && tacoPrice ? (updatedTacos = create(path, fileName, tacoName, tacoDescription, tacoPrice), true) : inform('No tacos exist');
            break;
        case "show":
            tacoId = process.argv[3];
            inform(tacoId ? show(path, fileName, tacoId): 'Please provide a taco ID');
            break;
        case "update":
            tacoId = process.argv[3];
            tacoName = process.argv[4];
            tacoDescription = process.argv[5];
            tacoPrice = process.argv[6];
            const firstList = readJSONFile(path, fileName);
            updatedTacos = edit(path, fileName, tacoId, tacoName, tacoDescription, tacoPrice);
            writeToFile = firstList.length === updatedTacos.length;
            break;
        case "destroy":
            tacoId = process.argv[3];
            const oldList = readJSONFile(path, fileName);
            updatedTacos = destroy(path, fileName, tacoId);
            writeToFile = oldList.length !== updatedTacos.length;
            break;
        case "addItem":
            tacoId = process.argv[3];
            const quantity = parseInt(process.argv[4], 10);
            const tacos = readJSONFile(path, fileName);
            updatedTacos = addItem(tacoId, quantity, tacos);
            inform(updatedTacos);
            break;
        case "getCartTotal": 
            const total = getCartTotal();
            inform(`Total Price: ${total.totalPrice.toFixed(2)}, Total Items: ${total.totalItems}`);
            break;
        case "cancelCart":
            inform(cancelCart());
            break;
        default:
            inform('No tacos for you.')
    }
    if(writeToFile) {
        writeJSONFile(path, fileName, updatedTacos)
    }
}

run();

