import React, { useEffect, useState, useCallback } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import InfiniteScroll from 'react-infinite-scroll-component';
import useStore from '../store';

const Feed = () => {
  const { tweets, loading, hasMore, fetchTweets, fetchNewTweets } = useStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Set up a timer to fetch new tweets every 60 seconds
    const timer = setInterval(() => {
      fetchNewTweets();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNewTweets();
    setRefreshing(false);
  }, [fetchNewTweets]);

  return (
    <div>
      <h1>Twitter Feed</h1>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchTweets}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more tweets to load.</p>}
        refreshFunction={handleRefresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {tweets.map((tweet) => (
          <div key={tweet.tweetId} style={{ margin: '20px 0' }}>
            <TwitterTweetEmbed tweetId={tweet.tweetId} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;