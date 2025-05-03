import React from "react";
import styles from "./Post.module.css";
import { PostProps } from "../../types";
import { FcLike } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";

const Post: React.FC<PostProps> = ({
  username,
  userAvatar,
  imageUrl,
  likes,
  caption,
}) => {
  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <div className={styles.userInfo}>
          <img src={userAvatar} alt={username} className={styles.userAvatar} />
          <span className={styles.username}>{username}</span>
        </div>
        <button className={styles.moreOptions}>•••</button>
      </div>

      <div className={styles.postImage}>
        <img src={imageUrl} alt="Post content" />
      </div>

      <div className={styles.postActions}>
        <div className={styles.actionButtons}>
          <button className={styles.actionButton}>
            <FcLike size={24} />
          </button>
          <button className={styles.actionButton}>
            <AiOutlineComment size={24} />
          </button>
          <button className={styles.actionButton}>
            <PiShareFat size={24} />
          </button>
        </div>
        <div className={styles.likes}>{likes.toLocaleString()} likes</div>
        <div className={styles.caption}>
          <span className={styles.username}>{username}</span> {caption}
        </div>
      </div>
    </div>
  );
};

export default Post;
