const Controller = require('egg').Controller;

const cheerio = require('cheerio');

const getHotNews = (res) => new Promise((resolve, reject) => {
  let hotNews = [];
  let $ = cheerio.load(res.text);
  // console.log(res.text)

  // 找到目标数据所在的页面元素，获取数据
  $('div#pane-news ul li a').each((idx, ele) => {
    // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
    // 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
    let news = {
      title: $(ele).text(),        // 获取新闻标题
      href: $(ele).attr('href')    // 获取新闻网页链接
    };
    hotNews.push(news)              // 存入最终结果数组
  });
  resolve(hotNews)
})

const superagent= require('superagent');
/**
 * index.js
 * [description] - 使用superagent.get()方法来访问百度新闻首页
 */
const getSuperagentNews = () => new Promise((resolve, reject) => {
  superagent.get('http://news.baidu.com/').end((err, res) => {
    if (err) {
      // 如果访问失败或者出错，会这行这里
      console.log(`热点新闻抓取失败 - ${err}`)
      reject(err)
    } else {
      // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
      // 抓取热点新闻数据
      // hotNews = getHotNews(res)
      resolve(res)
    }
  });
});

class HomeController extends Controller {

  get logger() {
    return this.ctx.logger;
  }
  
  async index() {
    try {
      const superagentNews = await getSuperagentNews()
      const news = await getHotNews(superagentNews)
      // console.log(news)
      this.logger.info(superagentNews);
      this.ctx.body = 'hello';
    } catch (e) {
      this.ctx.body = 'error'
    }
  }
}

module.exports = HomeController;