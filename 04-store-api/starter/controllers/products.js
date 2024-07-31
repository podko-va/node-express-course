const Product = require('../models/product')


const getAllProductsStatic = async (req,res) => {
    //throw new Error('testing async errors')
    const search = 'be'
    
    const products = await Product.find({
        name: { $regex: search, $options: 'i'},
    }).sort('name -price')
    console.log({ $regex: search, $options: 'i'});
    res.status(200).json({products, nbHits: products.length})
}

const getAllProduct = async(req,res) => {
    const products = await Product.find(req.query);
    
    const {featured, company, name} = req.query
    const queryObject = {}
    if (featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company){
        queryObject.company = company
    }
    if (name){
        queryObject.name = { $regex: name, $options: 'i'}
    }
    console.log(queryObject);
    res.status(200).json({products, nbHits: products.length})
}


module.exports = {
    getAllProductsStatic,
    getAllProduct,
}