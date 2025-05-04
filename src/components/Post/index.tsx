import React, { useState } from "react";
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleAvatarLoad = () => {
    setAvatarLoaded(true);
  };

  const isFullyLoaded = imageLoaded && avatarLoaded;

  return (
    <div className={styles.post}>
      {/* Loader */}
      {!isFullyLoaded && (
        <div className={styles.skeleton} data-testid="skeletonLoader">
          <div className={styles.skeletonHeader}>
            <div className={styles.skeletonAvatar}></div>
            <div className={styles.skeletonUsername}></div>
          </div>
          <div className={styles.skeletonImage}></div>
          <div className={styles.skeletonActions}>
            <div className={styles.skeletonButtons}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText}></div>
          </div>
        </div>
      )}

      <div className={isFullyLoaded ? styles.visible : styles.hidden}>
        <div className={styles.postHeader}>
          <div className={styles.userInfo}>
            <img
              src={userAvatar}
              alt={username}
              className={styles.userAvatar}
              onLoad={handleAvatarLoad}
              onError={() => setAvatarLoaded(true)}
            />
            <span className={styles.username}>{username}</span>
          </div>
          <button className={styles.moreOptions}>•••</button>
        </div>

        <div className={` ${imageLoaded ? styles.loaded : styles.postImage}`}>
          <img
            src={imageUrl}
            alt="Post content"
            onLoad={handleImageLoad}
            onError={() => setImageLoaded(true)}
          />
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
    </div>
  );
};

export default Post;
