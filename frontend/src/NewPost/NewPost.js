import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";
import MarkdownIt from "markdown-it";
import markdownItKatex from "markdown-it-katex"; // For rendering TeX formulas
import "katex/dist/katex.min.css"; // Import Katex CSS

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
    };

    // Here you can make an HTTP POST request to your backend
    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    // After successful post, navigate back to /home
    navigate("/home");
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

      <div className="form-actions">
        <button onClick={handleCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button onClick={handlePost} className="btn btn-primary">
          Post
        </button>
      </div>
    </div>
  );
}

export default NewPost;
