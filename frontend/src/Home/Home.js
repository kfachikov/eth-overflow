import { useNavigate } from "react-router-dom";
import "./Home.css";
import ToggleOptions from '../Components/ToggleOptions/ToggleOptions.js'

function Home() {
    const handleToggle = {}
    const options = ["Newest", "Best"];
    return (
        <div class = "outer-grid-container">
            <div class="interactionArea">
                <div class="searchBar">
                    <input id="searchBar" type="text" placeholder="Search here"/>
                </div>
                <ToggleOptions onToggle={handleToggle} options={options}>
                </ToggleOptions>
                <button class="bigBadBunnyButton">
                    <label>Post new Question</label>
                </button>
            </div>
            <div class="questionCardArea">
                Second
            </div>
        </div>
    )
}
export default Home;