import React from 'react'
import BlogMain from '../blog/BlogMain'
import CustomerNav from './CustomerNav'

function CustomerBlog({ user, setUser }) {
    return (
        <div>
            <CustomerNav setUser={setUser} />
            <BlogMain />
        </div>
    )
}

export default CustomerBlog
