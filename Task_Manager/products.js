import fs from 'fs/promises';

const FILE_PATH = './products.json';
const readData = async () => {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

const writeData = async (data) => {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
};
const [, , command, ...args] = process.argv;

const run = async () => {
    let products = await readData();

    switch (command) {
        case 'add':
            const [name, description, date, category, expireFlag] = args;
            
            const newProduct = {
                id: Date.now(),
                name,
                description,
                date, 
                category,
                isExpired: expireFlag === '--isexpire' ? new Date(date) < new Date() : null
            };

            products.push(newProduct);
            await writeData(products);
            console.log("დაემატა!");
            break;

        case 'read':
            console.table(products);
            break;

        case 'get':
            const product = products.find(p => p.id == args[0]);
            console.log(product || "ვერ მოიძებნა");
            break;

        case 'delete':
            products = products.filter(p => p.id != args[0]);
            await writeData(products);
            console.log("წაიშალა!");
            break;

        case 'update':
            const id = args[0];
            const index = products.findIndex(p => p.id == id);
            if (index !== -1) {
                products[index] = { ...products[index], name: args[1] || products[index].name };
                await writeData(products);
                console.log("განახლდა!");
            }
            break;

        default:
            console.log("გამოიყენეთ: add, read, get, delete, update");
    }
};

run();