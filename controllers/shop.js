const Product = require('../models/product');
const CartItem = require('../models/cartItem');

exports.getShop = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/shop.ejs',{
      pageTitle: 'Shop',
      products: products,
      editing: false
    });
  })
  .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart => {
    return cart.getProducts();
  })
  .then(products => {
    res.render('shop/cart.ejs',{
      pageTitle: 'Cart',
      cartProducts: products,
      editing: false
    });
  })
  .catch(err => console.log(err));
}

exports.getOrder = (req, res, next) => {
  req.user.getOrders({include:['products']})
  .then(orders => {
    res.render('shop/orders.ejs',{
      pageTitle: 'Orders',
      orders: orders
    });
  })
  .catch(err => console.log(err));
}

exports.postAddToCart = (req, res, next) => {
  const id = req.body.id;
  let fetchedCart;
  // let fetchedProduct;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where:{id: id}});
  })
  .then(products => {
    console.log("Products in cart:", products);
    //have existing products
    if(products.length > 0){
      const product = products[0];
      // console.log(product.cartItem);
      // console.log(product.cartItem.quantity);
      const newQuantity = product.cartItem.quantity + 1;
      return product.cartItem.update({quantity: newQuantity})
      .then(() => {
        res.redirect('/shop/get-cart');
      })
    }
    return Product.findByPk(id)
    .then(product => {
      console.log(fetchedCart.cartItems);
      return fetchedCart.addProduct(product,{through: {quantity: 1}});
    })
    .catch(err => console.log(err));
  })
  .then(() => {
    res.redirect('/shop/get-cart');
  })
  .catch(err => console.log(err));

  // const id = req.body.id;
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user.getCart()
  // .then(cart => {
  //   fetchedCart = cart;
  //   return fetchedCart.getProducts({where: {id : id}});
  // })
  // .then(products => {
  //   let product;
  //   if(products.length > 0){
  //     product = products[0];
  //   }

  //   if(product){
  //     newQuantity += product.cartItem.quantity;
  //     product.cartItem.update({quantity: newQuantity});
  //     return product;
  //   }

  //   return Product.findByPk(id)
  //   .then(product => {
  //     return fetchedCart.addProduct(product,{through: {quantity: newQuantity}});
  //   })
  // })
  // .then(() => {
  //   res.redirect('/shop/get-cart');
  // })
  // .catch(err => console.log(err));
}

exports.postDelete = (req, res, next) => {
  const id = req.body.id;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({where: {id: id}});
  })
  .then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then(() => {
    res.redirect('/shop/get-cart');
  })
  .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts();
  })
  .then(products => {
    return req.user.createOrder()
    .then(order => {
      return order.addProducts(products.map(
        product => {
          product.orderItem = { quantity: product.cartItem.quantity};
          return product;
        }
      ));
    })
    .then(() => {
      fetchedCart.setProducts(null);
      res.redirect('/shop/get-order');
    }) 
  })
  .catch(err => console.log(err));
}