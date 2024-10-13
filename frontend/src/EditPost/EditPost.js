import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditPost.css";
import MarkdownIt from "markdown-it";
import markdownItKatex from "markdown-it-katex"; // For rendering TeX formulas
import "katex/dist/katex.min.css"; // Import Katex CSS

import CreateTag from "../Components/CreateTag/CreateTag";
import Button, { ButtonSize } from "../Components/Button";
import { updateQuestion } from '../services/questionService';

function EditPost() {
  const { state } = useLocation()
  const [questionId, setQuestionId] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [notify, setNotify] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const post = JSON.parse(state);
    setQuestionId(post.postId);
    setTitle(post.title);
    setContent(post.content);
    setTags(post.tags.map((tag) => ({ value: tag.tagId, label: tag.name })));
  }, [state]);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  // Initialize markdown-it with markdown-it-katex plugin
  const mdParser = new MarkdownIt().use(markdownItKatex);

  const handleCancel = () => {
    navigate(`/question/${questionId}`);
  };

  const handlePost = async () => {
    const postData = {
      title: title,
      content: content,
      tags: tags.map((tag) => tag.value),
    };

    await updateQuestion(questionId, postData).then(() => {
      navigate(`/question/${questionId}`);
    }).catch((_error) => {
      alert("Failed to update the question!");
    });
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
        <CreateTag tags={tags} onChange={handleTagsChange} />
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

export default EditPost;
