const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/autonomous', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post('/autonomous', (request, response) => {
    const data = request.body;
    database.insert(data);
    response.json(data);
});