import './CategoryTab.css'
function CategoryTab({className,fontColor,backgroundColor1,backgroundColor2,category,onClick}){
    const name = className? ' '+className:'';
    return (
        <button
        className={"category_button"+name}
        style={{
          background: `linear-gradient(90deg, ${backgroundColor1}, ${backgroundColor2})`,
          color: fontColor,
        }}
        onClick={() => onClick(category)}
      >
        {category}
      </button>
    )
}
export default CategoryTab;