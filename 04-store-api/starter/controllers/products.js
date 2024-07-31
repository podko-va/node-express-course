const Product = require('../models/product')


const getAllProductsStatic = async (req,res) => {
    //throw new Error('testing async errors')
    const search = 'e'
    
    const products = await Product.find({
        name: { $regex: search, $options: 'i'},
    })
    .sort('name -price')
    .select('name')
    .limit(6)
    .skip(1);
    console.log({ $regex: search, $options: 'i'});
    res.status(200).json({products, nbHits: products.length})
}

const getAllProduct = async(req,res) => {    
    const {featured, company, name, sort, fields} = req.query
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

    let result = Product.find(queryObject)
    //sort
    if (sort){
        console.log(sort)
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList) 
    }
    else {
        result = result.sort('createAt')
    }
    //field
    if (fields){
        console.log(fields)
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList) 
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)*limit;

    result = result.skip(skip).limit(limit);
    const products = await result;
    res.status(200).json({products, nbHits: products.length})
}


module.exports = {
    getAllProductsStatic,
    getAllProduct,
}