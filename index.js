require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x4ckn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const moontech = async () => {
    try {
        await client.connect();
        const productsCollection = client.db('moontech').collection('products');

        // Check Server is Ok or Not
        app.get('/', (req, res) => {
            res.send('Welcome Moon TechApp');
        })
        /***************************** Products************************** */
        // Post New Products 
        app.post('/products', async (req, res) => {
            const getSingleProduct = req.body
            const result = await productsCollection.insertOne(getSingleProduct);
            res.send(result);
        })
        // Get All Products 
        app.get('/products', async (req, res) => {
            let result = await productsCollection.find({}).toArray();
            res.send(result);
        })


    }
    finally {

    }
}

moontech().catch(() => console.dir)
app.listen(PORT, () => console.log('Connect Moon Tech'));