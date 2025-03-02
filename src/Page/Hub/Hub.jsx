import { useEffect, useState } from "react";
import CategoryTab from "../../component/CategoryTab/CategoryTab";
import "./Hub.css";
import {categoriesArray} from "../../static/category";
import Post from "../../component/Post/Post";
import { useNavigate } from "react-router";
import { fetchPosts } from "../../api"; 


function Hub() {
  const [selectCategory, setSelectCategories] = useState(categoriesArray[0].type);
  const [data,setData]= useState([]) 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch data from FastAPI backend using the function from api.js
    const fetchData = async () => {
      try {
        const posts = await fetchPosts(); // Use the fetchPosts function
        const result = posts.map((val) => ({
          ...val,
          platform: 'github', // You can add platform or other properties
          liked: false, // Initial liked state
        }));
        setData(result); // Set the posts in state
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
  }, [selectCategory]); // Re-fetch when the category changes

  const onClickLike = (id) => {
    const index = data.findIndex((val) => val.id === id);
    if (index === -1) {
      console.log('Post not found');
      return;
    }
    const isLike = !data[index].liked;
    setData((prev) => {
      const newData = [...prev];
      newData[index].liked = isLike;
      newData[index].upvotes += isLike ? 1 : -1; // Update upvotes
      return newData;
    });
  };

  const onClickPost = (id) => {
    navigate('/post/' + id);
  };

  return (
    <div>
      <div id="hub_container">
        <div id="hub_categories">
          {categoriesArray.map((category) => (
            <CategoryTab
              key={category.type}
              category={category.type}
              backgroundColor1={category.backGroundColor1}
              backgroundColor2={category.backGroundColor2}
              onClick={setSelectCategories}
              fontColor={category.font}
            />
          ))}
        </div>
        <div id="title_hub">{selectCategory}</div>
        <div id="post_containers">
          {loading ? (
            <div>Loading...</div>
          ) : (
            data.map(({ title, body, id, upvotes, link, comments, liked, category, platform }) => (
              <Post
                key={id}
                id={id}
                title={title}
                description={body}
                likeCount={upvotes}
                commentCount={comments.length} // Assuming comments is an array
                liked={liked}
                link={link}
                category={category}
                platform={platform}
                onClickLike={onClickLike}
                onClickPost={onClickPost}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Hub;
