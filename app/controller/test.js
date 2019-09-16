const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    this.ctx.body = 'Hello test test test';
  }
}

module.exports = TestController;