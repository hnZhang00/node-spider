
const Controller = require('./base');
const Crawl = require('../utils/crawl');

class HomeController extends Controller {
  
  async index() {
    try {
      const superagentNews = await Crawl();
      this.success(superagentNews);
    } catch (e) {
      this.fail('hello');
    }
  }
}

module.exports = HomeController;