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
    body: "She was infatuated with color. She didn't have a favorite color per se, but she did have a fondness for teals and sea greens. You could see it in the clothes she wore that color was an important part of her overall style. She took great pride that color flowed from her and that color was always all around her. That is why, she explained to her date sitting across the table, that she could never have a serious relationship with him due to the fact that he was colorblind.",
    upvotes: 5,
    comments: [{ id: '12321' }, { id: '12322' }],
    category: 'finance',
    link: 'https://randomwordgenerator.com/paragraph.php',
  },
  {
    id: '123457',
    title: 'Another post title',
    body: "He was a man of few words, but the words he did speak were always profound. His silence was not due to a lack of thoughts, but rather a careful consideration of what was worth saying. He believed that words had power and should not be wasted on trivial matters. This made him a man of mystery to many, but those who knew him well understood the depth of his character.",
    upvotes: 8,
    comments: [{ id: '12323' }, { id: '12324' }],
    category: 'tech',
    link: 'https://randomwordgenerator.com/paragraph.php',
  },
  {
    id: '123458',
    title: 'Yet another post title',
    body: "The sun set over the horizon, casting a warm glow over the landscape. It was a moment of tranquility, a brief respite from the chaos of the day. As the colors of the sky shifted from orange to pink to purple, she felt a sense of peace wash over her. It was in these moments that she felt most connected to the world around her, and to herself.",
    upvotes: 12,
    comments: [{ id: '12325' }, { id: '12326' }],
    category: 'health/fitness',
    link: 'https://randomwordgenerator.com/paragraph.php',
  },
  {
    id: '123459',
    title: 'A fourth post title',
    body: "The quick brown fox jumps over the lazy dog. This sentence contains every letter in the English alphabet, making it a perfect example for typography and font testing. It's a simple sentence, but it serves a very useful purpose.",
    upvotes: 3,
    comments: [{ id: '12327' }, { id: '12328' }],
    category: 'education',
    link: 'https://randomwordgenerator.com/paragraph.php',
  },
  {
    id: '123460',
    title: 'A fifth post title',
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.",
    upvotes: 7,
    comments: [{ id: '12329' }, { id: '12330' }],
    category: 'productivity',
    link: 'https://randomwordgenerator.com/paragraph.php',
  },
  {
    id: '123461',
    title: 'A sixth post title',
    body: "Curabitur sit amet mauris morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam.",
    upvotes: 10,
    comments: [{ id: '12331' }, { id: '12332' }],
    category: 'social',
    link: 'https://randomwordgenerator.com/paragraph.php',
  },
  {
    id: '123462',
    title: 'A seventh post title',
    body: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum.",
    upvotes: 6,
    comments: [{ id: '12333' }, { id: '12334' }],
    category: 'tech',
    link: 'https://randomwordgenerator.com/paragraph.php',
  },
  {
    id: '123463',
    title: 'An eighth post title',
    body: "Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    upvotes: 4,
    comments: [{ id: '12335' }, { id: '12336' }],
    category: 'finance',
    link: 'https://randomwordgenerator.com/paragraph.php',
  },
  {
    id: '123464',
    title: 'A ninth post title',
    body: "Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet.",
    upvotes: 9,
    comments: [{ id: '12337' }, { id: '12338' }],
    category: 'health/fitness',
    link: 'https://randomwordgenerator.com/paragraph.php',
  },
  {
    id: '123465',
    title: 'A tenth post title',
    body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
    upvotes: 11,
    comments: [{ id: '12339' }, { id: '12340' }],
    category: 'education',
    link: 'https://randomwordgenerator.com/paragraph.php',
  }
  ];

function Hub() {
  const [selectCategory, setSelectCategories] = useState(categoriesArray[0].type);
  const [data,setData]= useState([]) 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    // axios.get('http://localhost:8000/posts').then((res)=>{
    //   const result = res.data.map((val)=>({
    //     ...val,
    //     platform:'reddit',
    //     liked:false,
    //   }))
    //   setData(result);
    // }).catch(err=>{
    //   console.log(err);
    // })
    //fetch data here
    const result = dummyData.map((val)=>({
      ...val,
      platform:'reddit',
      liked:false,
    }))
    setData(result);
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
        const newData = [...prev];
        newData[index].liked = isLike;
        newData[index].upvotes += (isLike)?1:-1;
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
            {data.map(({title,body,id,upvotes,link,commentCount,liked,category,platform})=><Post key={id} id={id} title={title} description={body} likeCount={upvotes} commentCount={commentCount} liked={liked} link={link} category={category} platform={platform} onClickLike={onClickLike} onClickPost={onClickPost}/>)}
        </div>
      </div>
    </div>
  );
}
export default Hub;
