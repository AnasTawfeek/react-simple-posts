import React, {Component} from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import {POSTS_API, USER_API} from '../constants'

import Post from '../components/Post'

export default class PostsPage extends Component {
    constructor(){
        super();
        this.state = {
            posts: [],
            hasMore: true,
            users: {}
        }
    }
    async _handlePostsLoad(page) {
        // current loaded posts
        const {posts} = this.state;

        // load initial/next page
        const _postsResponse = await fetch(POSTS_API(page));
        const _posts = await _postsResponse.json();

        _posts.length > 0
        ? (
            this.setState({
                posts: [
                    ...posts,
                    ..._posts
                ]
            }),
            // Fetch users
            this._handleUsersLoad(
                _posts
                .map(({userId}) => userId) // Get userIds
                .filter((id, pos, ids) => ids.indexOf(id) === pos) // Remove doublicates
            )
        )
        : await this.setState({hasMore: false})
    }

    async _handleUsersLoad(ids) {
        const {users} = this.state;

        // Remove doublicates & already loaded users
        const _ids = ids.filter(id => !users[id]);

        // Make sure its not already/being loaded
        if(_ids.length > 0) {

            // Set a placeholder to avoid double calls
            this.setState({
                users: {
                    ...this.state.users,
                    ..._ids.reduce((acc, id) => {
                        acc[id] = {};
                        return acc;
                    }, {})
                }
            });

            // Fetch the user data
            const _usersResponse = await fetch(USER_API(_ids));
            const _users = await _usersResponse.json();

            // Save the user data
            // We get the current loaded users directly from
            // the state incase its changed by other <Post />
            await this.setState({
                users: {
                    ...this.state.users,
                    ..._users.reduce((acc, user) => {
                        acc[user.id] = user;
                        return acc;
                    }, {})
                }
            })
        }
    }

    render (){
        const { posts, hasMore, users } = this.state;
        return (
            <div className="page posts-page">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={page => this._handlePostsLoad(page)}
                    hasMore={hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        {
                            posts.map(post => (
                                <Post
                                    key={post.id}
                                    post={post}
                                    user={users[post.userId]}
                                />
                            ))
                        }
                    </InfiniteScroll>
                </div>
            )
        }
    }
