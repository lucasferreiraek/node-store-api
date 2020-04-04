const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    // 1st arg: filters - 2nd arg: required fields
    return Product.find({ active:true }, 'title description price slug')
}

exports.getBySlug = (slug) => {
    return Product.findOne({
        slug: slug,
        active: true
    }, 'title description slug price')
}

exports.getByTag = (tag) => {
    return Product.find({
        tags: tag,
        active: true
    }, 'title description price tags')
}

exports.post = (data) => {
    var product = new Product(data);
    return product.save();
}

exports.put = (id, data) => {
    return Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug,
            tags: data.tags
        }
    });
}

exports.delete = (id) => {
    return Product.findOneAndRemove(id);
}