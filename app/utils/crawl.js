
const superagent= require('superagent');
const cheerio = require('cheerio');

const getHotNews = (res) => {
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
  return hotNews
}

module.exports = () => new Promise((resolve, reject) => {
  superagent.get('http://news.baidu.com/').end((err, res) => {
    if (err) {
      console.log(`热点新闻抓取失败 - ${err}`)
      return reject(err)
    }
    resolve(getHotNews(res))
  });
});