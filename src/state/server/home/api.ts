import axios from "axios";

const allOriginsURL = "https://api.allorigins.win/get?url=";
const targetURLBase =
  "https://www.catholic.ac.kr/front/boardlist.do?cmsDirPkid=2053&cmsLocalPkid=";

export const fetchPosts = async (keyword: string) => {
  const targetURL = encodeURIComponent(
    targetURLBase + encodeURIComponent(keyword)
  );
  const response = await axios.get(`${allOriginsURL}${targetURL}`);

  return response.data.contents;
};
