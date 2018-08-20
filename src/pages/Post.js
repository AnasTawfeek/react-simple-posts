import React, {Component} from 'react'
import {POST_API, COMMENT_API, USER_API} from '../constants'

import Post from '../components/Post'
import Comment from '../components/Comment'

export default class PostPage extends Component {
    constructor(){
        super();
        this.state = {
            post: {},
            comments: [],
            hasMore: true,
            user: {}
        }
    }
    componentWillMount(){
        this._handlePostLoad();
        this._handleCommentsLoad();
    }

    async _handlePostLoad() {
        const {match: {params: {id}}} = this.props;

        // load initial/next page
        const _postResponse = await fetch(POST_API(id));
        const post = await _postResponse.json();

        this.setState({post});

        // Fetch user
        this._handleUsersLoad(post.userId);
    }

    async _handleCommentsLoad() {
        const {match: {params: {id}}} = this.props;

        // Fetch the comments
        const _commentsResponse = await fetch(COMMENT_API(id));
        const comments = await _commentsResponse.json();

        this.setState({comments});
    }

    async _handleUsersLoad(id) {
        // Fetch the user data
        const _userResponse = await fetch(USER_API([id]));
        const user = await _userResponse.json();

        // Save the user data
        await this.setState({user: user[0]})
    }

    render (){
        const { post, comments, hasMore, user } = this.state;
        return (
            <div className="page post-page">
                <Post
                    key={post.id}
                    post={post}
                    user={user}
                />
                {
                    comments.map(comment => (
                        <Comment comment={comment} />
                    ))
                }
            </div>
        )
    }
}
