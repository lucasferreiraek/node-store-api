const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const validationContract = require('../validators/fluentValidator'); 
const repository = require('../repositories/productRepository');


exports.listProduct = (request, response, next) => {
    repository.get().
    then(data => {
        response.status(200).send(data);
    }).catch(e => {
        response.status(400).send({
            message: "Ouch :(", 
            error: e
        });
    });
};

exports.listProductBySlug = (request, response, next) => {
    
    repository.getBySlug(request.params.slug)
    .then(data => {
        response.status(200).send(data);
    }).catch(e => {
        response.status(400).send(e);
    });
};

exports.listProductByTag = (request, response, next) => {

    repository.getByTag(request.params.tag)
    .then(data => {
        response.status(200).send(data);
    }).catch(e => {
        response.status(400).send(e);
    });
};

exports.createProduct = (request, response, next) => {
    let contract = new validationContract();

    contract.hasMinLen(request.body.title, 3, "Title must be 3 characters at least");
    contract.hasMinLen(request.body.slug, 3, "Title must be 3 characters at least");
    contract.hasMinLen(request.body.description, 3, "Title must be 3 characters at least");

    if (!contract.isValid()) {
        response.status(400).send(contract.errors()).end();
        return;
    }

    repository.post(request.body)
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

exports.updateProduct = (request, response, next) => {

    repository.put(request.params.id, request.body).then(x => {
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

exports.deleteProduct = (request, response, next) => {
    repository.delete(request.body.id)
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
