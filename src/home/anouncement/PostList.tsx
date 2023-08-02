import styles from "../../App.module.css";
import { Post } from "../../state/server/home/hooks/anouncement.queries";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  const truncateTitle = (title: string) => {
    return title.length > 35 ? title.slice(0, 35) + "..." : title;
  };

  return (
    <div className={styles.listContainer}>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <a href={post.link} target="_blank" rel="noreferrer">
              {truncateTitle(post.title)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
