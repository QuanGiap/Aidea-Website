import React from 'react';
import convertDay from '../../tool/convertDay';
import './Comment.css';
import OutlineIcon from '../OutlineIcon/OutLineIcon';

function Comment({ username, date, body, upvotes, liked, onLike }) {
  return (
    <div className="comment_container">
      <div className="comment_header">
        <span className="comment_username">{username}</span>
        <span className="comment_date">{convertDay(date)}</span>
      </div>
      <div className="comment_body">{body}</div>
      <div className="comment_footer">
        <OutlineIcon svgFile={"/svg/Like.svg"} onClick={onLike} outlined={liked}/>
        <span className="comment_upvotes">{upvotes}</span>
      </div>
    </div>
  );
}

export default Comment;