// Title.tsx
import React from "react";
import styles from "./App.module.css";

interface TitleProps {
  title: string;
  onClick: () => void;
  active: boolean;
}

const Title: React.FC<TitleProps> = ({ title, onClick, active }) => {
  const titleStyle = active ? styles.activeTitle : styles.inactiveTitle;

  return (
    <div className={titleStyle} onClick={onClick}>
      {title}
    </div>
  );
};

export default Title;
