const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  res.render('admin/index',{
    pageTitle: 'Index'
  });
}

exports.getAdminProduct = (req, res, next) => {
  Product.findAll({raw: true})
  .then(products => {
    res.render('admin/product-list',{
      pageTitle: 'Admin Products',
      products: products
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product',{
    pageTitle: 'Add Product',
    editing: false
  });
}

exports.postAddProduct = (req, res, next) => {
  const productName = req.body.productName;
  const image = req.body.image;
  const price = req.body.price;
  req.user.createProduct({
    productName: productName,
    image: image,
    price: price
  });
  res.redirect('/admin/get-product-list');
}

exports.postDelete = (req, res, next) => {
  const id = req.body.id;
  Product.findByPk(id)
  .then((product) => {
    product.destroy();
    res.redirect('/admin/get-product-list');
  })
  .catch((err) => {console.log(err)});
}

exports.getEditProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByPk(id)
  .then(product => {
    res.render('admin/add-product',{
      pageTitle: 'Edit Product',
      product: product,
      editing: true
    });
  })
  .catch((err) => {console.log(err)});
}

exports.postEditProduct = (req, res, next) => {
  const productName = req.body.productName;
  const image = req.body.image;
  const price = req.body.price;

  const id = req.body.id;
  Product.findByPk(id)
  .then(product => {
    product.productName = productName,
    product.image = image,
    product.price = price
    return product.save()
  })
  .then(() => {
    res.redirect('/admin/get-product-list');
  })
  .catch((err) => {console.log(err)});
}