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

    parsePostFromJSON = (jsonObject) => {
        this.postId = jsonObject.id;
        this.title = jsonObject.title;
        this.content = jsonObject.content;
        this.score = jsonObject.score;
        this.timestamp = jsonObject.createdAt;
        this.authorId = jsonObject.authorId;
        this.username = jsonObject.author.username;
        this.isBestAnswer = jsonObject.isBestAnswer;
        this.isQuestion = jsonObject.isQuestion;
        this.tags = jsonObject.tags.map(tag => new TagModel(tag.id, tag.name));

        return this;
    }
}

export const parsePostFromJSON = (jsonObject) => {
    return new PostModel().parsePostFromJSON(jsonObject);
}

export default PostModel