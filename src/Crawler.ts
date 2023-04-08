// Crawler.ts
import axios from 'axios';
import cheerio from 'cheerio';

export interface Post {
  title: string;
  link: string;
}

export const getParsedPosts = async (keyword: string): Promise<Post[]> => {
  const html = await getHTML(keyword);
  const $ = cheerio.load(html.data);
  const $titleList = $('.rbbs_list_normal_sec > ul > li > a');

  let titles: Post[] = [];
  $titleList.each((idx, node) => {
    const title = $(node).find('.text').text();
    titles.push({
      title: title.replace(/[\n\t새글]/g, ''),
      link: 'https://www.catholic.ac.kr' + $(node).attr('href'),
    });
  });

  const filteredArr = titles.reduce((acc: Post[], current: Post) => {
    const x = acc.find(item => item.title === current.title);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const realArr = filteredArr.slice(0, 7);
  return realArr;
};

const getHTML = async (keyword: string) => {
    try {
      const allOriginsURL = 'https://api.allorigins.win/get?url=';
      const targetURL = encodeURIComponent(`https://www.catholic.ac.kr/front/boardlist.do?cmsDirPkid=2053&cmsLocalPkid=${encodeURIComponent(keyword)}`);
      const response = await axios.get(`${allOriginsURL}${targetURL}`);
      return { data: response.data.contents };
    } catch (err) {
      throw err;
    }
  };
  
  