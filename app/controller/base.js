'use strict';

const Controller = require('egg').Controller;
const Status = require('../constants/status');

class BaseController extends Controller {
  get user() {
    return this.ctx.state.user.data;
  }

  get logger() {
    return this.ctx.logger;
  }
  
  success(result) {
    this.logger.info(result);
    this.ctx.body = {
      status: 0,
      message: 'Everything is ok.',
      result,
    };
  }

  fail(err) {
    this.logger.error(err);

    if (!Status[err]) console.error(err);

    const message = Status[err] || err.toString();
    const status = Status[err] ? err : -1;
    this.ctx.body = {
      status,
      message,
      result: null
    };
  }
}

module.exports = BaseController;
