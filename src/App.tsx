// App.tsx
import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import PostList from "./PostList";
import { Post, getParsedPosts } from "./Crawler";
import Title from "./Ttile";

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>("1");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (activeCategory) {
      const fetchPosts = async () => {
        const data = await getParsedPosts(activeCategory);
        setPosts(data);
      };
      fetchPosts();
    } else {
      setPosts([]);
    }
  }, [activeCategory]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className={styles.App}>
      <div className={styles.box}>
        <div className={styles.titleContainer}>
          <Title title="일반" onClick={() => handleCategoryClick("1")} active={activeCategory === "1"} />
          <Title title="학사" onClick={() => handleCategoryClick("2")} active={activeCategory === "2"} />
          <Title title="장학" onClick={() => handleCategoryClick("3")} active={activeCategory === "3"} />
          <Title title="취업" onClick={() => handleCategoryClick("4")} active={activeCategory === "4"} />
        </div>
        {activeCategory && <PostList posts={posts} />}
      </div>
    </div>
  );
};

export default App;
