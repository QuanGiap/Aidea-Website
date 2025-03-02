import React, { useEffect, useState } from "react";

import axios from "axios";
import "./PostDetail.css";
import { useParams } from "react-router";

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
      body: "Yet another comment body text",
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
    url: "https://www.reddit.com/r/europe/comments/1j15zc6/after_yesterdays_shtshow_in_the_us_how_absolutely/",
    upvotes: 1023,
  },
};

const PostDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      // // Fetch post data by ID
      // const fetchPost = async () => {
      //   setLoading(true);
      //   try {
      //     // Replace with your API endpoint
      //     const response = await axios.get(`http://localhost:8000/comments/`+id);
      //     setData(response.data);
      //     setLoading(false);
      //   } catch (error) {
      //     console.error('Error fetching post:', error);
      //   }
      //   setLoading(false);
      // };
      // fetchPost();
      setData(dummyData);
    }, [id]);

    if (loading) {
      return <div>Loading...</div>;
    }

  return <div className="post-detail-container">You clicked post {id}</div>;
};

export default PostDetail;
