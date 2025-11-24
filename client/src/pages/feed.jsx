import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'

const Feed = () => {

  const[feeds, setfeeds] = useState([])
  const[loading, setLoading] = useState(true)

  const fetchFeeds = async () => {
    setfeeds(dummyPostsData)
  }

  useEffect(()=>{
    fetchFeeds
  },[])

  return !loading(
    <div>

    </div>
  )
}

export default feed