// App.tsx
import React from "react";
import styles from "./App.module.css";
import Category from "./Category";

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Category title="일반" cmsLocalPkid="1" />
      <Category title="학사" cmsLocalPkid="2" />
      <Category title="장학" cmsLocalPkid="3" />
      <Category title="취업" cmsLocalPkid="4" />
    </div>
  );
};

export default App;
