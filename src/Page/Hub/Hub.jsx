import { useEffect, useState } from "react";
import CategoryTab from "../../component/CategoryTab/CategoryTab";
import "./Hub.css";
import {categoriesArray} from "../../static/category";
import Post from "../../component/Post/Post";
import axios from "axios";
import { useNavigate } from "react-router";
const dummyData = [
    {
      id: '123456',
      title: 'This is a title of the post asdhoawhndoaihnswdfp aiosdjoapijwd adpiajwdp asiodpjawdpjm napisojdpaiw',
      description: "She was infatuated with color. She didn't have a favorite color per se, but she did have a fondness for teals and sea greens. You could see it in the clothes she wore that color was an important part of her overall style. She took great pride that color flowed from her and that color was always all around her. That is why, she explained to her date sitting across the table, that she could never have a serious relationship with him due to the fact that he was colorblind.",
      likeCount: 5,
      commentCount: 10,
      category: 'finance',
      link: 'https://randomwordgenerator.com/paragraph.php',
      platform: 'github',
      liked: false,
    },
    {
      id: '123457',
      title: 'Another post title',
      description: "He was a man of few words, but the words he did speak were always profound. His silence was not due to a lack of thoughts, but rather a careful consideration of what was worth saying. He believed that words had power and should not be wasted on trivial matters. This made him a man of mystery to many, but those who knew him well understood the depth of his character.",
      likeCount: 8,
      commentCount: 15,
      category: 'tech',
      link: 'https://randomwordgenerator.com/paragraph.php',
      platform: 'google',
      liked: true,
    },
    {
      id: '123458',
      title: 'Yet another post title',
      description: "The sun set over the horizon, casting a warm glow over the landscape. It was a moment of tranquility, a brief respite from the chaos of the day. As the colors of the sky shifted from orange to pink to purple, she felt a sense of peace wash over her. It was in these moments that she felt most connected to the world around her, and to herself.",
      likeCount: 12,
      commentCount: 20,
      category: 'health/fitness',
      link: 'https://randomwordgenerator.com/paragraph.php',
      platform: 'github',
      liked: false,
    },
    {
      id: '123459',
      title: 'A fourth post title',
      description: "The quick brown fox jumps over the lazy dog. This sentence contains every letter in the English alphabet, making it a perfect example for typography and font testing. It's a simple sentence, but it serves a very useful purpose.",
      likeCount: 3,
      commentCount: 5,
      category: 'education',
      link: 'https://randomwordgenerator.com/paragraph.php',
      platform: 'google',
      liked: false,
    },
    {
      id: '123460',
      title: 'A fifth post title',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.",
      likeCount: 7,
      commentCount: 9,
      category: 'productivity',
      link: 'https://randomwordgenerator.com/paragraph.php',
      platform: 'github',
      liked: true,
    },
    {
      id: '123461',
      title: 'A sixth post title',
      description: "Curabitur sit amet mauris morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam.",
      likeCount: 10,
      commentCount: 12,
      category: 'social',
      link: 'https://randomwordgenerator.com/paragraph.php',
      platform: 'google',
      liked: false,
    },
    {
      id: '123462',
      title: 'A seventh post title',
      description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum.",
      likeCount: 6,
      commentCount: 8,
      category: 'tech',
      link: 'https://randomwordgenerator.com/paragraph.php',
      platform: 'github',
      liked: true,
    },
    {
      id: '123463',
      title: 'An eighth post title',
      description: "Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      likeCount: 4,
      commentCount: 6,
      category: 'finance',
      link: 'https://randomwordgenerator.com/paragraph.php',
      platform: 'google',
      liked: false,
    },
    {
      id: '123464',
      title: 'A ninth post title',
      description: "Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet.",
      likeCount: 9,
      commentCount: 11,
      category: 'health/fitness',
      link: 'https://randomwordgenerator.com/paragraph.php',
      platform: 'github',
      liked: true,
    }
  ];

function Hub() {
  const [selectCategory, setSelectCategories] = useState(categoriesArray[0].type);
  const [data,setData]= useState([]) 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    //fetch data here
    setData(dummyData);
    //fetch again if category change
  },[selectCategory])
  const onClickLike = (id)=>{
    //find data
    const index = data.findIndex((val)=>val.id === id);
    //if not found send error
    if(index===-1){
        console.log('Post not found');
        return;
    }
    const isLike = !data[index].liked;
    //update data from server
    // axios()
    //on update success
    setData(prev=>{
        const likeCount = prev[index];
        const newData = [...prev];
        newData[index].liked = isLike;
        newData[index].likeCount += (isLike)?1:-1;
        return newData;   
    })
  }
  const onClickPost = (id)=>{
    navigate('/post/'+id);
  }
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
            {data.map(({title,description,id,likeCount,link,commentCount,liked,category,platform})=><Post key={id} id={id} title={title} description={description} likeCount={likeCount} commentCount={commentCount} liked={liked} link={link} category={category} platform={platform} onClickLike={onClickLike} onClickPost={onClickPost}/>)}
        </div>
      </div>
    </div>
  );
}
export default Hub;
