const express = require('express')
const mongoose = require('mongoose')

const Product = require('./models/productModel')
const app = express()

//Routes
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res) => {
    console.log("Launching my backend-app");
    res.send("Launching my backend-app!")
})

app.get('/productList', async (req, res) => {
    try{
        const products = await Product.find({})
        res.status(200).json(products)
        
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    console.log(req.body);
    res.send(req.body);
})

app.get('/productList/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
        
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    console.log(req.body);
    res.send(req.body);
})

app.put('/productList/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            res.status(404).json({message: `cannot find my product by productId: ${id}`})
            return
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
        
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    console.log(req.body);
    res.send(req.body);
})

//delete a product
app.delete('/productList/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404).json({message: `cannot find my product by productId: ${id}`})
            return
        }
        res.status(200).json({message: product})
        
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    console.log(req.body);
    res.send(req.body);
})

app.post('/product', async (req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)

    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    console.log(req.body);
    res.send(req.body);
})


mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://admin:admin@my-backend-app.9gegprk.mongodb.net/my-first-collection?retryWrites=true&w=majority')
.then(() =>{
    console.log("Connected to Database.");
    app.listen(3000, () =>{
        console.log("My backend-app is running on port 3000");
    })
}).catch((error)=>{
    console.log(error);
})