import React from 'react'
import './style.css'

export default ({comment}) => (
    <div className="comment">
        <div className="comment__author">
            <div className="comment__author__name">{comment.name}</div>
            <div className="comment__author__email">{comment.email}</div>
        </div>
        <div className="comment__body">{comment.body}</div>
    </div>
)
