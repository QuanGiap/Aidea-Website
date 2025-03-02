import React, { useState, useEffect, useRef } from "react";
import "./Post.css";
import { categoriesObj } from "../../static/category";
import OutlineIcon from "../OutlineIcon/OutLineIcon";
import getLogoPlatform from "../../static/logoPlatform";

function Post({
  id,
  platform,
  onClickPost = (id) => {},
  onClickLike = (id) => {},
  title,
  description,
  likeCount,
  commentCount,
  link,
  category,
  liked = false,
}) {
  const [isTop, setIsTop] = useState(true);
  const [isBottom, setIsBottom] = useState(false);
  const postBodyRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = postBodyRef.current;
    setIsTop(scrollTop === 0);
    setIsBottom(scrollTop + clientHeight >= scrollHeight);
  };

  useEffect(() => {
    const postBody = postBodyRef.current;
    postBody.addEventListener("scroll", handleScroll);
    return () => {
      postBody.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="post_container" onClick={() => onClickPost(id)}>
      <div className="post_header_container">
        <p className="post_tilte" title={title}>{title}</p>
        <div className="post_header_interact_group">
          <OutlineIcon
            svgFile={"/svg/Like.svg"}
            outlined={liked}
            onClick={(e) => { e.stopPropagation(); onClickLike(id); }}
          />
          {likeCount}
          <OutlineIcon svgFile={"/svg/chat.svg"} outlined clickable={false} />
          {commentCount}
          <OutlineIcon
            svgFile={"/svg/link.svg"}
            outlined
            onClick={() => window.open(link)}
          />
        </div>
      </div>
      <div className={`post_body ${!isTop ? 'fade-top' : ''} ${!isBottom ? 'fade-bottom' : ''}`} ref={postBodyRef}>
        {description}
      </div>
      <div className="post_footer">
        <div className="post_category_group">
          Category <div className="post_category">{category}</div>
        </div>
        {platform && <img className="post_img" src={getLogoPlatform(platform)} alt={platform} />}
      </div>
    </div>
  );
}

export default Post;