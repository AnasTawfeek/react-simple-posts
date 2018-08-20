import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default ({
    post,
    user
}) => (
    <div className="post">
        <Link to={`/post/${post.id}`}>
            <div className="post__author">
                {
                    user &&
                    user.id &&
                    <img
                        className="post__author__thumb"
                        src={`https://randomuser.me/api/portraits/men/${user && user.id}.jpg`}
                        alt={user && user.name}/>
                }
                <span className="post__author__name">{user && user.name}</span>
            </div>
            <div className="post__body">
                <div className="post__body__title">
                    {post.title}
                </div>
                <div className="post__body__body">
                    {post.body}
                </div>
            </div>
        </Link>
    </div>
)
