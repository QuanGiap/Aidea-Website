import React, { useEffect, useState } from 'react';

import axios from 'axios';
import './PostDetail.css';
import { useParams } from 'react-router';

// const dummyData = {
//   title
// }

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch post data by ID
//     const fetchPost = async () => {
//       try {
//         // Replace with your API endpoint
//         // const response = await axios.get(`/api/posts/${id}`);
//         const response = {data:'This is a data'}
//         setPost(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching post:', error);
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!post) {
//     return <div>Post not found</div>;
//   }

  return (
    <div className="post-detail-container">
      You clicked post {id}
    </div>
  );
};

export default PostDetail;