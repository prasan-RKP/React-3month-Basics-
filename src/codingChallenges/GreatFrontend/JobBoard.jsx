import { Loader2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'

const JobBoard = () => {

  const [limit, setLimit] = useState(5);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const userIds = [47777902, 47775606, 47741953, 47720918, 47713744, 47675302, 47667011, 47660343, 47648499, 47638270, 47632460, 47620857, 47618602, 47611044, 47606495, 47599673, 47583712, 47558305, 47553796, 47527399, 47506490, 47485231, 47422408, 47415350, 47404801, 47401618, 47397842, 47376619, 47353904, 47351089, 47341760]


  let initids = useMemo(() => {
    return userIds.slice(0, limit);
  }, [limit]);


  const fetchMessages = async () => {
    if(!initialLoad){
      setBtnLoading(true);
    }
    setLoading(true);
    try {
      let res = await Promise.all(
        initids.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(res => res.json())
        )
      );

      let reMessages = res.sort((a, b) => b.time - a.time);
      setMessages(reMessages);

    } catch (error) {
      console.log(error);
    }

    finally {
      setLoading(false);
      setInitialLoad(false);
      setBtnLoading(false);
    }
  }


  const loadMore = () => {
    setLimit((prev) => prev + 5);
  };


  useEffect(() => {
    fetchMessages();
  }, [limit])


  return (
    <div className='min-h-screen bg-black'>
      <div className='flex flex-col items-center gap-2 pt-6 text-gray-300'>

        {loading && (
            <p className='text-center text-lg'>Please wait your content is loading ....</p>
        )}
        {loading && messages.length > 0 && (
          <p className='text-center text-lg'>No Messages !</p>
        )}

        {messages.map((mess) =>
          <div key={mess?.id} className=' flex items-center flex-col bg-gray-800 h-[150px] w-[500px] gap-5 justify-center rounded-md'>
            <p>{mess?.title}</p>
            <p>By {mess.by} · {new Date(mess.time * 1000).toLocaleString()}</p>
          </div>

        )}
        <button onClick={loadMore} className='px-4 mb-8 py-2 mt-4 rounded-md bg-yellow-600'>
          {btnLoading ? (
            <Loader2 className='h-5 w-5 animate-spin' />
          ): "Load More"}
          </button>
      </div>
    </div>
  )
}

export default JobBoard;
