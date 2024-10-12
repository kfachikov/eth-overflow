import TagModel from "./TagModel.js";

class PostModel {
    postId;
    username;
    authorId;
    title;
    content;
    timestamp;
    tags;
    score;
    isQuestion;
    isBestAnswer;

    constructor(postId, username, authorId, title, content, timestamp, tags, score, isQuestion, isBestAnswer) {
        this.postId = postId;
        this.username = username;
        this.authorId = authorId;
        this.title = title;
        this.content = content;
        this.timestamp = timestamp;
        this.tags = tags;
        this.score = score;
        this.isQuestion = isQuestion;
        this.isBestAnswer = isBestAnswer;

        return this;        
    }

    static parsePostFromJSON(jsonObject) {
        this.postId = jsonObject.id;
        this.title = jsonObject.title;
        this.content = jsonObject.content;
        this.score = jsonObject.score;
        this.timestamp = jsonObject.createdAt;
        this.authorId = jsonObject.authorId;
        this.username = jsonObject.username;
        this.tags = jsonObject.tags.map(tag => new TagModel(tag.id, tag.name));
    }
}

export default PostModel