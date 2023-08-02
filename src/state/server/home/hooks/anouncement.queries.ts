import { useQuery } from "react-query";
import cheerio from "cheerio";
import { fetchPosts } from "../api";

export interface Post {
  title: string;
  link: string;
}

export const usePosts = (keyword: string) => {
  return useQuery(["posts", keyword], () => parsePosts(fetchPosts(keyword)));

  async function parsePosts(htmlPromise: Promise<string>) {
    const html = await htmlPromise;
    const $ = cheerio.load(html);
    const $titleList = $(".rbbs_list_normal_sec > ul > li > a");

    let titles: Post[] = [];
    $titleList.each((idx, node) => {
      const title = $(node).find(".text").text();
      titles.push({
        title: title.replace(/[\n\t새글]/g, ""),
        link: "https://www.catholic.ac.kr" + $(node).attr("href"),
      });
    });

    const filteredArr = titles.reduce((acc: Post[], current: Post) => {
      const x = acc.find((item) => item.title === current.title);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    return filteredArr.slice(0, 7);
  }
};
