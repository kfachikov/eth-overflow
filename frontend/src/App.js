import './App.css';

import {Routes, Route} from "react-router-dom";
import Login from "./Login/Login";
import NewPost from "./NewPost/NewPost";
import Question from "./Question/Question";
import UserProfile from "./UserProfile/UserProfile";
import HomePage from './Home/Home';
import PostModel from "./Models/PostModel";
import TagModel from "./Models/TagModel";
import PostCard from './Components/PostCard/PostCard';

function App() {
  var tag = new TagModel(0, "tag-1300")
  var tag2 = new TagModel(1, "tag-1301")
  var question = new PostModel(
    0,
    "test_username",
    "test_author_id",
    "test_title",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non fermentum risus. Nulla sit amet diam eget odio maximus commodo. Morbi tristique cursus nisi, eget bibendum tellus ultrices quis. Nam mollis ligula ac iaculis cursus. Nam eu hendrerit diam. Mauris at leo velit. Donec sit amet tellus cursus, tincidunt est vitae, egestas turpis. Sed sit amet mollis nisl. Sed quis justo eget nibh elementum dapibus quis quis diam. Vivamus ut vehicula massa, eget placerat nulla. \n Cras posuere consequat metus eget sodales. Maecenas laoreet, nisl eu condimentum sagittis, sem dolor tempus tortor, at congue metus elit placerat urna. In semper erat ut diam fringilla, quis maximus sem condimentum. Phasellus condimentum magna ac venenatis pulvinar. Nulla non imperdiet purus. In quis ultricies est. Donec tempus eros id neque auctor, eget venenatis ligula mattis. Morbi molestie vel nibh in porta. Nullam laoreet dui quis mi semper tempus vitae vel eros. Nulla ligula urna, auctor nec viverra sit amet, viverra et diam. Etiam dui lorem, sodales vitae laoreet tristique, finibus et dolor. Ut non facilisis felis, at imperdiet nibh. Proin consequat nulla non finibus feugiat.",
    // "test_content",
    "test_timestamp",
    [tag, tag2],
    0,
    true,
    true
  )

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/question/:question_id" element={<Question />} />
        <Route path="/userprofile/:username" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
