import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";
import MarkdownIt from "markdown-it";
import markdownItKatex from "markdown-it-katex"; // For rendering TeX formulas
import "katex/dist/katex.min.css"; // Import Katex CSS

import { createQuestion } from "../services/postService";
import CreateTag from "../Components/CreateTag/CreateTag";
import Button, { ButtonSize } from "../Components/Button";

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [notify, setNotify] = useState(true);
  const navigate = useNavigate();

  // Initialize markdown-it with markdown-it-katex plugin
  const mdParser = new MarkdownIt().use(markdownItKatex);

  const handleCancel = () => {
    navigate("/home");
  };

  const handlePost = async () => {
    const postData = {
      title: title,
      content: content,
      tags: tags,
    };

    // // Here you can make an HTTP POST request to your backend
    // await fetch("/api/posts", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(postData),
    // });
    await createQuestion(postData);

    // After successful post, navigate back to /home
    navigate("/home");
  };

  const handleTagsChange = (tags) => {
    setTags(tags.map((tag) => tag.label));
  };

  return (
    <div className="new-post-grid">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <CreateTag onChange={handleTagsChange} />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content (Markdown and LaTeX supported)</label>
        <textarea
          id="content"
          className="form-control content-input"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here. You can use Markdown and TeX expressions."
        ></textarea>
      </div>

      <div className="form-group preview">
        <h3>Preview</h3>
        <div
          className="markdown-preview"
          dangerouslySetInnerHTML={{ __html: mdParser.render(content) }}
        ></div>
      </div>

      <div className="form-group">
        <div className="notification-confirmation">
          <input type="checkbox" defaultChecked />I want to receive
          notifications when someone answers my question.
        </div>
      </div>

      <div className="form-actions">
        <Button
          text="Cancel"
          onClick={handleCancel}
          isDelete={true}
          size={ButtonSize.MEDIUM}
        ></Button>
        <Button
          text="Post"
          onClick={handlePost}
          size={ButtonSize.MEDIUM}
        ></Button>
      </div>
    </div>
  );
}

export default NewPost;
