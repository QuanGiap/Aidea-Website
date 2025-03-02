import React, { useEffect, useState } from "react";

import axios from "axios";
import "./PostDetail.css";
import { useParams } from "react-router";
import OutlineIcon from "../../component/OutlineIcon/OutLineIcon";
import CategoryTab from "../../component/CategoryTab/CategoryTab";
import { categoriesObj } from "../../static/category";
import Button2 from "../../component/Button2/Button2";
import Button from "../../component/Button/Button";
import Comment from "../../component/Comment/Comment";
const generateRandomDate = () => {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const dummyData = {
  post_id: "1234859",
  comments: [
    {
      comment_id: "123456",
      body: "This is a body text",
      user_id: "654321",
      created_at: generateRandomDate(),
      username: "User 101",
      comment_upvotes: 5,
    },
    {
      comment_id: "123457",
      body: "Another comment body text",
      user_id: "654322",
      created_at: generateRandomDate(),
      username: "User 102",
      comment_upvotes: 3,
    },
    {
      comment_id: "123458",
      body: "Yet another really really reallyreally really really long  comment body text",
      user_id: "654323",
      created_at: generateRandomDate(),
      username: "User 103",
      comment_upvotes: 7,
    },
    {
      comment_id: "123459",
      body: "More comment body text",
      user_id: "654324",
      created_at: generateRandomDate(),
      username: "User 104",
      comment_upvotes: 2,
    },
    {
      comment_id: "123460",
      body: "Additional comment body text",
      user_id: "654325",
      created_at: generateRandomDate(),
      username: "User 105",
      comment_upvotes: 4,
    },
  ],
  post: {
    id: "1234859",
    title: "This is a post title",
    category: "social",
    body:"She was infatuated with color. She didn't have a favorite color per se, but she did have a fondness for teals and sea greens. You could see it in the clothes she wore that color was an important part of her overall style. She took great pride that color flowed from her and that color was always all around her. That is why, she explained to her date sitting across the table, that she could never have a serious relationship with him due to the fact that he was colorblind.",
    url: "https://www.reddit.com/r/europe/comments/1j15zc6/after_yesterdays_shtshow_in_the_us_how_absolutely/",
    upvotes: 1023,
  },
};

const PostDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comment,setComment] = useState("");
  useEffect(() => {
    setLoading(true);
    // Fetch post data by ID
    // const fetchPost = async () => {
    //   setLoading(true);
    //   try {
    //     // Replace with your API endpoint
    //     const response = await axios.get(`http://localhost:8000/comments/`+id);
    //     const result = {
    //       ...response.data,
    //       upvoted_post: false,
    //       comments: response.data.comments.map((val) => ({ ...val, upvoted: false })).sort((v1,v2)=>v2.comment_upvotes-v1.comment_upvotes),
    //     };
    //     setData(result);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching post:', error);
    //   }
    //   setLoading(false);
    // };
    // fetchPost();

    //fetch dummy data
    const result = {
      ...dummyData,
      upvoted_post: false,
      comments: dummyData.comments.map((val) => ({ ...val, upvoted: false })).sort((v1,v2)=>v2.comment_upvotes-v1.comment_upvotes),
    };
    setData(result);

    setLoading(false);
  }, [id]);
  const onClickLikePost = () =>{
    //update like
    const isLiked = !data.upvoted;
    //update like on post fetch
    setData(prev=>{
      const new_data = {...prev};
      new_data.upvoted = isLiked;
      new_data.post.upvotes += isLiked? 1 : -1;
      return new_data;
    })
  }
  const onClickLikeComment = (id) =>{
    //update like
    const index = data.comments.findIndex((cmt)=>cmt.comment_id===id);
    if(index==-1){
      console.log('Comments not found');
      return;
    }
    const isLiked = !data.comments[index].upvoted;
    //update like on post fetch
    setData(prev=>{
      const new_data = {...prev};
      new_data.comments[index].upvoted=isLiked;
      new_data.comments[index].comment_upvotes+=isLiked?1:-1;
      return new_data;
    })
  }
  const onPostComment = (e) =>{
    e.preventDefault();
    //post comment
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No post found</div>;
  }
  const { post } = data;
  //determine top ans
  return (
    <div id="post_detail_container">
      <div id="post_detail_title">{post.title}</div>
      <div id="post_detail_info_group">
        <div id="post_detail_interact_group">
          <OutlineIcon svgFile={"/svg/Like.svg"} onClick={onClickLikePost} outlined={data.upvoted}/>
          {post.upvotes}
          <OutlineIcon
            svgFile={"/svg/link.svg"}
            outlined
            onClick={()=>window.open(post.url)}
          />
        </div>
        <div className="post_detail_category_group">
          Category{" "}
          <CategoryTab
            category={post.category}
            className={'post_detail_category_tab'}
            backgroundColor1={categoriesObj[post.category].backGroundColor1}
            backgroundColor2={categoriesObj[post.category].backGroundColor2}
            fontColor={categoriesObj[post.category].font}
          />
        </div>
      </div>
      <div id="post_detail_body_container">
        {post.body}
      </div>
      <div id="post_detail_ans_container">
        <div id="post_detail_ans_top_title">Top Answer</div>
        <div id="post_detail_ans_top_break_line"></div>
        {/* Break line */}
        <div id="post_detail_ans_top_username">{data.comments[0].username}</div>
        <div className="post_detail_ans_top_body">{data.comments[0].body}</div>
      </div>
        <div className="post_detail_comments_title">Comments ({data.comments.length})</div>
        <form>
        <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Enter your comment" rows={5} required id="post_detail_input_conmment"></textarea>
        <div id="post_detail_input_controler">
          <Button2 className="post_detail_cancel_button">cancel</Button2>
          <Button type={'submit'} onClick={onPostComment} className="post_detail_post_button">post</Button>
        </div>
        </form>
        <div className="post_detail_comments_container">
          {data.comments.map(cmt=><Comment key={cmt.comment_id} username={cmt.username} date={cmt.created_at} body={cmt.body} upvotes={cmt.comment_upvotes} liked={cmt.upvoted} onLike={()=>onClickLikeComment(cmt.comment_id)}/>)}
        </div>
    </div>
  );
};

export default PostDetail;
