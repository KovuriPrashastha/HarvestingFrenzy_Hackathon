import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import Blog from './Blog'
import BlogUpload from './BlogUpload'

function BlogMain() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      db.collection("blogPosts")
        .orderBy("timestamp", "desc")
        .limit(6)
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          );
        });
      console.log(posts);
    }, []);

    return (
        <div>
           <BlogUpload/>
           {posts.map(({ id, post }) => (
       <center>
       <Blog 
       key={id}
       postId={id}
       userName={post.username}
       email={post.email}
       content={post.content}
       title={post.title}
    imgUrl={post.imgUrl}
       likes={post.likes}
       likedUsers={post.likedUsers}
       /> 
       </center>
      ))}


           
        </div>
    )
}

export default BlogMain
