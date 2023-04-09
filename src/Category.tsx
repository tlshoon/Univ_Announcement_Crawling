// Category.tsx
import React, { useEffect, useState } from "react";
import { Post, getParsedPosts } from "./Crawler";
import styles from "./App.module.css";

interface CategoryProps {
  title: string;
  cmsLocalPkid: string;
  onClick: () => void;
  active: boolean;
}

const Category: React.FC<CategoryProps> = ({ title, cmsLocalPkid, onClick, active }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getParsedPosts(cmsLocalPkid);
      setPosts(data);
    };
    fetchPosts();
  }, [cmsLocalPkid]);

  return (
    <div>
      <div className={styles.title} onClick={onClick}>
        {title}
      </div>
      {active && (
        <div className={styles.listContainer}>
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
      )}
    </div>
  );
};

export default Category;
