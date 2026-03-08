import React, { useEffect } from 'react'
import "../style/Feed.scss"
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import Nav from '../../shared/components/Nav'
function Feed() {
    const{feed,handleGetFeed,loading,handleLike,handleUnlike}=usePost()


    useEffect(()=>{
   handleGetFeed()
    },[])


    if(loading||!feed){
        return(<main><h1>loading feed....</h1></main>)
    }
console.log(feed);


    return (
       <main className='feed-page'>
        <Nav/>
        <div className="feed">
            <div className="posts">
          {feed.map(post=>{
             return <Post user={post.user} post={post} loading={loading} handleLike={handleLike}  handleUnLike={handleUnlike}/>
          })}
            </div>
        </div>
       </main>
    )
}

export default Feed
