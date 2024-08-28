const accesscontrol = require('accesscontrol');

// const roles = new accesscontrol();
//
// roles.grant('customer')
//   .readOwn('account')
//   .updateOwn('account')
//   .deleteOwn('account')
//   .createOwn('order')
//   .readOwn('order')
//   .createOwn('order')
//   .deleteOwn('order')
//   .readOwn('cart')
//   .createOwn('cart')
//   .deleteOwn('cart');
// roles.grant('admin')
//   .extend('customer')
//   .createAny('flower')
//   .updateAny('flower')
//   .deleteAny('flower')
//   .createAny('category')
//   .updateAny('category')
//   .deleteAny('category')
//   .readAny('account')
//   .deleteAny('account')
//   .readAny('order')
//   .readAny('cart');

const ac = new accesscontrol.AccessControl({
  admin: {
    brand: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
  user: {
    brand: {
      // 'create:own': ['*'],
      'read:any': ['*'],
      // 'update:own': ['*'],
      // 'delete:own': ['*'],
    },
  },
});

// const checkGrant = (user, action, resource) => (user ? ac.can(user.group)[action](resource).granted : false);
exports.checkGrant = (action, resource) => (req, res, next) => {
  if (ac.can(req.user.group)[action](resource).granted) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};
