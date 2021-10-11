import React, { useEffect } from "react";
import { connect } from "react-redux";


// Bring in the asynchronous fetchPosts action
import { fetchPosts } from '../actions/postsActions'
import { Post } from '../components/Post'

const PostsPage = ({ dispatch, loading, posts, hasErrors }) => {

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    // Show loading,error or success state

    const renderPosts = () => {
        if (loading) return <p>Loading Posts...</p>
        if (hasErrors) return <p>Unable to display Posts</p>
        return posts.map((post) => <Post key={post.id} post={post} excerpt={true}/>)
    }

    return (
        <section>
            <h1>Posts</h1>
            {renderPosts()}
        </section>
    )
}

// Map redux state to React component props

const mapStateToProps = (state) => ({
    loading: state.posts.loading,
    posts: state.posts.posts,
    hasErrors: state.posts.hasErrors
})

// Connect Redux to React
export default connect(mapStateToProps)(PostsPage)