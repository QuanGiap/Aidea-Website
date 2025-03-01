import Button from '../../component/Button/Button';
import './Home.css';
function Home(){
    return (
        <div id="home_container">
           <p>It all starts with.....</p>
           <img id="home_logo_img" src="logo/AIdea.png" alt="AIDea logo" />
           <p>Finding <span><img id="home_problem_img" src="imgs/problems.png" alt="problems"/></span> to help you find <span><img id="home_solution_img" src="imgs/solution.png" alt="solution"/></span></p>
            <Button className='home_button'>Learn More</Button>
        </div>
    )
}
export default Home;