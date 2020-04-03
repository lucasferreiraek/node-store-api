const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const validationContract = require('../validators/fluentValidator'); 


exports.get = (request, response, next) => {
    // 1st arg: filters - 2nd arg: required fields
    Product.find({ active:true }, 'title description price slug')
    .then(data => {
        response.status(200).send(data);
    }).catch(e => {
        response.status(400).send({
            message: "Ouch :(", 
            error: e
        });
    });
};

exports.getBySlug = (request, response, next) => {
    Product.findOne({
        slug: request.params.slug,
        active: true
    }, 'title description slug price')
    .then(data => {
        response.status(200).send(data);
    }).catch(e => {
        response.status(400).send(e);
    });
};

exports.getByTag = (request, response, next) => {
    Product.find({
        tags: request.params.tag,
        active: true
    }, 'title description price tags')
    .then(data => {
        response.status(200).send(data);
    }).catch(e => {
        response.status(400).send(e);
    });
};

exports.post = (request, response, next) => {
    let contract = new validationContract();

    contract.hasMinLen(request.body.title, 3, "Title must be 3 caracters");
    contract.hasMinLen(request.body.slug, 3, "Title must be 3 caracters");
    contract.hasMinLen(request.body.description, 3, "Title must be 3 caracters");

    if (!contract.isValid()) {
        response.status(400).send(contract.errors()).end();
        return;
    }

    var product = new Product(request.body);
    product.save()
    .then(x => {
        response.status(200).send({
            message: "Product created successfully"
        });
    }).catch(e => {
        response.status(400).send({
            message: "Product not created. Try again",
            data: e
        });
    });
};

exports.put = (request, response, next) => {
    Product.findByIdAndUpdate(request.params.id, {
        $set: {
            title: request.body.title,
            description: request.body.description,
            price: request.body.price,
            slug: request.body.slug,
            tags: request.body.tags
        }
    }).then(x => {
        response.status(200).send({
            message: "Update done!"
        });
    }).catch(e => {
        response.status(400).send({
            message: "Product not updated. Try again",
            data: e
        });
    });
};

exports.delete = (request, response, next) => {
    Product.findOneAndRemove(request.body.id)
    .then(data => {
        response.status(200).send({
            message: "Product removed"
        });
    }).catch(e => {
        response.status(400).send({
            message: "Ouch :(", 
            error: e
        });
    });
};
