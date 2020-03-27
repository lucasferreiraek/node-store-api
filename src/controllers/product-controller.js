'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = (request, response, next) => {
    Product.find(
        {active: true},
        'title price slug'
    ).then(data => {
        response.status(200).send(data)
    }).catch(e => {
        response.status(400).send(e)
    })
}

exports.getBySlug = (request, response, next) => {
    Product.findOne(
        {slug: request.params.slug,
        active: true},
        'title description price slug tags'
    ).then(data => {
        response.status(200).send(data)
    }).catch(e => {
        response.status(400).send(e)
    })
}

exports.getByTag = (request, response, next) => {
    Product.find(
        {tags: request.params.tag}
    ).then(data => {
        response.status(200).send(data)
    }).catch(e => {
        response.status(400).send(e)
    })
}

exports.post = (request, response, next) => {
    var product = new Product(request.body)
    product.save().then(x => {
        response.status(201).send({
            message:'Product created successfully'
        })
    }).catch(e => {
        response.status(400).send({
            message: 'Product wasn`t created',
            data: e
        })
    })
}

exports.put = (request, response, next) => {
    Product.findByIdAndUpdate(
        request.params.id, {
            $set: {
                title: request.body.title,
                description: request.body.description,
                price: request.body.price,
                slug: request.body.slug
            }
        }
    ).then(x => {
        response.status(200).send({
            message: "Product updated!"
        })
    }).catch(e => {
        response.status(400).send({
            message: "Ouch :("
        })
    })
}

exports.delete = (request, response, next) => {
    Product.findOneAndRemove(request.body.id)
    .then(x => {
        response.status(200).send({
            message: "Product deleted!"
        })
    }).catch(e => {
        response.status(400).send({
            message: "Ouch! Product not deleted :("
        })
    })
}

/** 
exports.getById = (request, response, next) => {
    Product.findById(request.params.id).then(data => {
        response.status(200).send(data)
    }).catch(e => {
        response.status(400).send(e)
    })
}
*/
