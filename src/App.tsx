import React, { useState } from "react";
import styles from "./App.module.css";
import PostList from "./home/anouncement/PostList";
import { usePosts } from "./state/server/home/hooks/anouncement.queries";
import Title from "./home/anouncement/Ttile";

const App = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>("1");
  const { data: posts, isError, isLoading } = usePosts(activeCategory || "");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  return (
    <div className={styles.App}>
      <div className={styles.box}>
        <div className={styles.titleContainer}>
          <Title
            title="일반"
            onClick={() => handleCategoryClick("1")}
            active={activeCategory === "1"}
          />
          <Title
            title="학사"
            onClick={() => handleCategoryClick("2")}
            active={activeCategory === "2"}
          />
          <Title
            title="장학"
            onClick={() => handleCategoryClick("3")}
            active={activeCategory === "3"}
          />
          <Title
            title="취업"
            onClick={() => handleCategoryClick("4")}
            active={activeCategory === "4"}
          />
        </div>
        {activeCategory && <PostList posts={posts || []} />}
      </div>
    </div>
  );
};

export default App;
