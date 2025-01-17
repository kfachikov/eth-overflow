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
      tags: tags.map((tag) => tag.value),
    };

    await createQuestion(postData);

    // After successful post, navigate back to /home
    navigate("/home");
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
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
        <span>Preview</span>
        <div
          className="markdown-preview"
          dangerouslySetInnerHTML={{ __html: mdParser.render(content) }}
        ></div>
      </div>

      <div className="form-group">
        <div className="notification-confirmation">
          <input className="checkbox-class" type="checkbox" defaultChecked />I want to receive
          notifications when someone answers my question!
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
