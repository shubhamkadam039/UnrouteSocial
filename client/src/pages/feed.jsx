import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import Storiesbar from '../components/Storiesbar'
import PostCard from '../components/PostCard'
import RecentMessages from '../components/RecentMessages'

const feed = () => {

  const [feeds, setFeeds] = useState([])
  const [loading, setloading] = useState(true)
  
  const fetchfeeds = async () => {
    setFeeds(dummyPostsData);
    setloading(false)
  }

  useEffect(() => {
    fetchfeeds()
  }, [])


  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* Stories and post list */}
      <div>
        <Storiesbar />
        <div className='p-4 space-y-6'>
          {feeds.map((post)=>(
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <div className='max-xl:hidden sticky top-0'>
        <div className='max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
          <h3 className='text-slate-800 font-semibold'>Sponsered</h3>
          <img src={assets.sponsored_img} className='w-75 h-50 rounded' alt="" />
          <p className='text-slate-600'>Email Marketing</p>
          <p className='text-slate-400'>Supercharge your marketing with a powerfull, easy-to-use platform built for results.</p>
        </div>
        <RecentMessages />
      </div>

    </div>
  ) : (
  <div className="min-h-screen w-full flex items-center justify-center">
    <Loading />
  </div>
)
}

export default feed