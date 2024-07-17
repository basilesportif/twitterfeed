import { create } from 'zustand';

const numTweets = 5;
const useStore = create((set) => ({
  tweets: [
    { url: "https://x.com/pmarca/status/1813368574414893117", tweetId: "1813368574414893117" },
    { url: "https://x.com/functi0nZer0/status/1813328346928845158", tweetId: "1813328346928845158" },
    { url: "https://x.com/functi0nZer0/status/1813328346928845158", tweetId: "1813328346928845158" },
    { url: "https://x.com/functi0nZer0/status/1813328346928845158", tweetId: "1813328346928845158" },
    { url: "https://x.com/functi0nZer0/status/1813328346928845158", tweetId: "1813328346928845158" }
  ],
  loading: false,
  hasMore: true,
  fetchNewTweets: async () => {
    set({ loading: true });
    const newTweets = [];
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 2));
      newTweets.push({
        tweetId: Date.now().toString(),
        url: `https://example.com`,
      });
    }
    set((state) => ({
      tweets: [...newTweets, ...state.tweets],
      loading: false,
    }));
    console.log(state.tweets)
    return newTweets.length;
  },
  /*
  fetchTweets: async () => {
    set({ loading: true });
    // Simulate a 3-second delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Simulating API call to fetch tweets
    const newTweets = Array.from({ length: numTweets }, (_, i) => ({
      id: uuidv4(),
      tweetId: `1${Math.floor(Math.random() * 1000000000000)}`,
    }));
    set((state) => ({
      tweets: [...state.tweets, ...newTweets],
      loading: false,
      hasMore: newTweets.length === numTweets,
    }));
  },
  */
}));

export default useStore;