const mongodb = require('mongodb');

const dbclient = mongodb.MongoClient;

(async () => {
    const conn = await dbclient.connect('mongodb://localhost:27017');
    try {
        const db = await conn.db('dbclientes');
        const clientes = await db.collection('clientes');
        await clientes.insertOne({
            name: 'Bruno',
            age: 23
        });
        const cursorClientes = await clientes.find({});
        cursorClientes.forEach(cliente => console.log(cliente));

        const cursorCliente = await clientes.find({ _id: mongodb.ObjectID('5ea0636c0f6b9611fc691cc2') });
        const resp = await cursorCliente.next();
        console.log(resp);

        const r = await clientes.deleteOne({ _id: mongodb.ObjectID('5ea0636c0f6b9611fc691cc2') });
        console.log(r.result);

        const res = await clientes.findOneAndDelete({ name: 'Tayane' });
        console.log(res.value);

        const respUpdate = await clientes.findOneAndUpdate({ name: 'Fabio' }, { name: 'Fabio', age: 28, country: 'Argentine', hobbies: 'Programming' });
        console.log(respUpdate.value);
        
    }
    catch (e) {
        console.error(e);
    } finally {
        conn.close();
    }
})();