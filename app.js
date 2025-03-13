const express = require('express');
const app = express();
const router = express.Router()
const server = require('http').createServer(app);
const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = process.env.DATABASE_KEY
const uri = "mongodb+srv://2400567:9TsgYcaMcjuf2HcU@compnetworktest.mjh9b.mongodb.net/?retryWrites=true&w=majority&appName=compnetworktest";
app.set('view engine', 'ejs');

let db

// router.get('/', (req, res) => {
//     res.render("index.ejs");
// });

server.listen(3000, function() { 
	console.log('Server Has Started!'); 
});

app.use('/', router);

// make some random id thing
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}

//get data from mongodb
app.get('/', async (req, res) => {
    try {
        const result = await db.collection('data').find().toArray();
        console.log('Data fetched:', result);
        res.render('index.ejs', { result });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//post (insert) data into mongodb
app.post('/data', (req, res) => {
    const currentDate = new Date().getTime();
    var data = "enabled"
    var randomString = generateRandomString(10)
    try {
        const result = db.collection('data').insertOne({ _id: randomString, data: data, date: currentDate});
        //res.status(201).json({ message: 'data inserted successfully' })
    } catch (err) {
        console.log('try catch error: ',err.message);s
    }
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
        await client.connect();
        db = client.db('compnetworktest'); // Replace with your database name
        console.log('connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
  }
  run().catch(console.dir);

module.exports = router;
