import React, { useState } from "react";
import { db } from "../Firebase";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import { useEffect } from "react";
import ScrollableFeed from 'react-scrollable-feed'

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("picturePosts")
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
    <div style={{ backgroundColor: "White" }}>
      <ImageUpload />
      <div style={{height: "80vh"}}>
      <ScrollableFeed >

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          postId={id}
          userName={post.username}
          email={post.email}
          caption={post.caption}
          imgUrl={post.imgUrl}
          likes={post.likes}
          likedUsers={post.likedUsers}
        />
      ))}
         </ScrollableFeed>
         </div>
    </div>
  );
}

export default Feed;
