/*!
 * nodeclub - route.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var sign = require('./controllers/sign');
var site = require('./controllers/site');
var user = require('./controllers/user');
var message = require('./controllers/message');
var topic = require('./controllers/topic');
var reply = require('./controllers/reply');
var rss = require('./controllers/rss');
var staticController  = require('./controllers/static');
var auth = require('./middlewares/auth');
var limit = require('./middlewares/limit');
var github = require('./controllers/github');
var search = require('./controllers/search');
var passport = require('passport');
var configMiddleware = require('./middlewares/conf');
var config = require('./config');


module.exports = function (app) {
  // home page
  app.get('/', site.index);
  // sitemap
  app.get('/sitemap.xml', site.sitemap);

  // sign controller
  if (config.allow_sign_up) {
    app.get('/signup', sign.showSignup);  // 跳转到注册页面
    app.post('/signup', sign.signup);  // 提交注册信息
  } else {
    app.get('/signup', configMiddleware.github, passport.authenticate('github'));  // 进行github验证
  }
  app.post('/signout', sign.signout);  // 登出
  app.get('/signin', sign.showLogin);  // 进入登录页面
  app.post('/signin', sign.login);  // 登录校验
  app.get('/active_account', sign.active_account);  //帐号激活

  app.get('/search_pass', sign.showSearchPass);  // 找回密码页面
  app.post('/search_pass', sign.updateSearchPass);  // 更新密码
  app.get('/reset_pass', sign.reset_pass);  // 进入重置密码页面
  app.post('/reset_pass', sign.update_pass);  // 更新密码

  // user controller
  app.get('/user/:name', user.index); // 用户个人主页
  app.get('/setting', auth.userRequired, user.showSetting); // 用户个人设置页
  app.post('/setting', auth.userRequired, user.setting); // 提交个人信息设置
  app.get('/stars', user.show_stars); // 显示所有达人列表页
  app.get('/users/top100', user.top100);  // 显示积分前一百用户页
  app.get('/user/:name/collections', user.get_collect_topics);  // 用户收藏的所有话题页
  app.get('/user/:name/topics', user.list_topics);  // 用户发布的所有话题页
  app.get('/user/:name/replies', user.list_replies);  // 用户参与的所有回复页
  app.post('/user/set_star', auth.adminRequired, user.toggle_star); // 把某用户设为达人
  app.post('/user/cancel_star', auth.adminRequired, user.toggle_star);  // 取消某用户的达人身份
  app.post('/user/:name/block', auth.adminRequired, user.block);  // 禁言某用户

  // message controler
  app.get('/my/messages', auth.userRequired, message.index); // 用户个人的所有消息页
  // topic
  // 新建文章界面
  app.get('/topic/create', auth.userRequired, topic.create);
  app.get('/topic/:tid', topic.index);  // 显示某个话题
  app.post('/topic/:tid/top/:is_top?', auth.adminRequired, topic.top);  // 将某话题置顶
  app.post('/topic/:tid/good/:is_good?', auth.adminRequired, topic.good); // 将某话题加精
  app.get('/topic/:tid/edit', auth.userRequired, topic.showEdit);  // 编辑某话题

  // Po-Ying Chen <poying.me@gmail.com>: 當 "非" 作者的使用者在留言的地方貼上一個網址為
  // http://[domain name]/topic/[topic id]/delete 的圖片之後，只要作者一看到圖片，文章就會被刪除了，
  // 可能需要將刪除的方法改成 post 來避免此問題
  //删除之后由于主页有缓存机制，重定向到主页之后可能还是能够看到删掉后的帖子，我认为没有必要删除后马上更新缓存，
  //因为可能减弱缓存的作用，等5s自动更新就好了
  app.post('/topic/:tid/delete', auth.userRequired, topic.delete);

  // 保存新建的文章
  // TODO: 如果创建文章的过程太长，导致session过期，界面的内容会丢失
  // FIXME: 采用前端来判断，不通过跳转的形式来解决
  app.post('/topic/create', auth.userRequired, limit.postInterval, topic.put);
  app.post('/topic/:tid/edit', auth.userRequired, topic.update);
  app.post('/topic/collect', auth.userRequired, topic.collect); // 关注某话题
  app.post('/topic/de_collect', auth.userRequired, topic.de_collect); // 取消关注某话题

  // reply controller
  app.post('/:topic_id/reply', auth.userRequired, limit.postInterval, reply.add); // 提交一级回复
  app.get('/reply/:reply_id/edit', auth.userRequired, reply.showEdit); // 修改自己的评论页
  app.post('/reply/:reply_id/edit', auth.userRequired, reply.update); // 修改某评论
  app.post('/reply/:reply_id/delete', auth.userRequired, reply.delete); // 删除某评论
  app.post('/reply/:reply_id/up', auth.userRequired, reply.up); // 为评论点赞
  app.post('/upload', auth.userRequired, topic.upload); //上传图片

  // static
  app.get('/about', staticController.about);
  app.get('/faq', staticController.faq);
  app.get('/getstart', staticController.getstart);
  app.get('/robots.txt', staticController.robots);

  //rss
  app.get('/rss', rss.index);

  // github oauth
  app.get('/auth/github', configMiddleware.github, passport.authenticate('github'));
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/signin' }),
    github.callback);
  app.get('/auth/github/new', github.new);
  app.post('/auth/github/create', github.create);

  app.get('/search', search.index);

};
