import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchPost } from '../actions/postActions'
import { fetchComments } from '../actions/commentsActions'
import { Post } from '../components/Post'
import { Comment } from '../components/Comment'

const SinglePostPage = ({
    post,
    loading,
    hasErrors,
    comments,
    match,
    dispatch
}) => {

    useEffect(() => {
        const { id } = match.params
        dispatch(fetchPost(id));
        dispatch(fetchComments(id));

    }, [dispatch, match])


    const renderPost = () => {

        if (loading.post) return <p>Loading Posts...</p>
        if (hasErrors.post) return <p>Unable to show the post</p>
        return <Post key={post.id} post={post} excerpt={false} />
    }

    const renderComments = () => {
        if (loading.comments) return <p>Loading comments...</p>
        if (hasErrors.comments) return <p>Unable to display comments.</p>

        return comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
        ))
    }
    return (
        <section>
            {renderPost()}
            <h2>Comments</h2>
            {renderComments()}
        </section>
    )
}

const mapStateToProps = (state) => ({
    post: state.post.post,
    comments: state.comments.comments,
    loading: { post: state.post.loading, comments: state.comments.loading },
    hasErrors: { post: state.post.hasErrors, comments: state.comments.hasErrors }
})


export default connect(mapStateToProps)(SinglePostPage)