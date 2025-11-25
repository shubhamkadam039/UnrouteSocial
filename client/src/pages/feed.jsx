import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import Storiesbar from '../components/Storiesbar'

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
          List of Post
        </div>
      </div>

      {/* Right sidebar */}
      <div>
        <div>
          <h1>Sponsered</h1>
        </div>
        <h1>Recent Messages</h1>
      </div>

    </div>
  ) : (
  <div className="min-h-screen w-full flex items-center justify-center">
    <Loading />
  </div>
)
}

export default feed