// Category.tsx
import React, { useEffect, useState } from "react";
import { Post, getParsedPosts } from "./Crawler";
import styles from "./App.module.css";

interface CategoryProps {
  title: string;
  cmsLocalPkid: string;
}

const Category: React.FC<CategoryProps> = ({ title, cmsLocalPkid }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getParsedPosts(cmsLocalPkid);
      setPosts(data);
    };
    fetchPosts();
  }, [cmsLocalPkid]);

  return (
    <div className={styles.box}>
      <h1>{title}</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <a href={post.link} target="_blank" rel="noreferrer">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
