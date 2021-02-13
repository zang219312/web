const router = require('koa-router')();

const users = require('../data/user');
const routers = require('../data/router');

router.post('/user_router_auth', async (ctx, next) => {
  const { uid } = ctx.request.body;
  if (uid) {
    let authRouterInfo = [];

    const userInfo = users.filter((user) => user.id == uid)[0];
    userInfo.auth.map((rid) => {
      routers.map((router) => {
        if (router.id === rid) {
          authRouterInfo.push(router);
        }
      });
    });

    ctx.body = authRouterInfo;
  } else {
    next();
  }
});

/* router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  };
}); */

module.exports = router;
