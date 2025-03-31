const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const User = require('./models/user');
const Cart = require('./models/cart');
const Product = require('./models/product');
const CartItem = require('./models/cartItem');
const OrderItem = require('./models/orderItem');
const Order = require('./models/order');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Product);
Product.belongsTo(User,{
  constraints:true
});

Product.belongsToMany(Cart,{through: CartItem});
Cart.belongsToMany(Product,{through: CartItem});

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through: OrderItem});
Product.belongsToMany(Order,{through: OrderItem});

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next) => {
  User.findByPk(1)
  .then(user => {
    if(user){
      req.user = user;
      next();//55
    }
  })
  .catch((err) => {
    console.log(err);
    next();
  })
});

app.use('/admin',adminRouter);
app.use('/shop',shopRouter);

let user;
sequelize.sync()
// sequelize.sync({force: true})
// sequelize.sync({alter: true})
.then(() => {
  return User.findByPk(1);
})
.then((user) => {
  if(!user){
    return User.create({
      name:'Lisa'
    });
  }
  return user;
})
.then(fetchedUser => {
  user = fetchedUser;
  return user.getCart()
})
.then(cart => {
  if(!cart){
    return user.createCart();
  }
})
.then(() => {
  app.listen(3001);
})
.catch(err => console.log(err));

