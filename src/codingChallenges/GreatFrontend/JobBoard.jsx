import { useState, useEffect} from 'react';
import './jobBoard.css';

export default function JobBoard() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(6);

  const userIds = [47777902, 47775606, 47741953, 47720918, 47713744, 47675302, 47667011, 47660343, 47648499, 47638270, 47632460, 47620857, 47618602, 47611044, 47606495, 47599673, 47583712, 47558305, 47553796, 47527399, 47506490, 47485231, 47422408, 47415350, 47404801, 47401618, 47397842, 47376619, 47353904, 47351089, 47341760]


  // Fetching logic - 1
  const fetchApi = async () => {
    if (!hasMore) return;
    setLoading(true);
    setBtnLoading(true);

    let initialIds = userIds.slice(0, limit);

    try {
      const posts = await Promise.all(
        initialIds.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(res => res.json())
        )
      );

      const rePosts = posts.sort((a, b) => b.time - a.time)

      setMessages(rePosts);
    }
    catch (err) {
      setLoading(false);
      setBtnLoading(false)
      console.log(err);

    }
    finally {
      setLoading(false);
      setBtnLoading(false);
    }
  }

  // 
  const loadMore = () => {
    setLimit((prev) => prev + 6);
  }

  useEffect(() => {
    fetchApi();
  }, [limit])

  useEffect(() => {
    if (limit >= userIds.length) {
      setHasMore(false);
    }
  }, [limit, userIds?.length]);

  return (

    <div>

      <h2 class="heading"> Hacker News Jobs Board </h2>

      <div className="content">
        {loading && messages.length === 0 ? (
          <p className="load-job">Loading ...</p>
        ) : (
          messages.map((mess) => (
            <div key={mess?.time} className="parent-div" >
              <p className="title">{mess.title}</p>
              <p className="date-val">
                By {mess.by} · {new Date(mess.time * 1000).toLocaleString()}
              </p>
            </div>
          ))
        )}

        <button onClick={loadMore} className="btn sent">
          {btnLoading ? "Loading..." : "Load More Jobs"}
          </button>
      </div>
    </div>

  );
}
