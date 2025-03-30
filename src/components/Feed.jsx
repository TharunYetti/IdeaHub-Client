import { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:7777/api/posts");
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setError("Failed to load posts, showing dummy data.");
        setPosts([
          {
            id: 1,
            user: "John Doe",
            avatar: "https://i.pravatar.cc/50?img=1",
            text: "Excited to share my latest project!",
            image: "https://source.unsplash.com/random/400x300",
            likes: 12,
            comments: 4,
            shares: 2,
          },
          {
            id: 2,
            user: "Jane Smith",
            avatar: "https://i.pravatar.cc/50?img=2",
            text: "Learning React is so much fun! 🚀",
            image: "https://source.unsplash.com/random/400x301",
            likes: 30,
            comments: 10,
            shares: 5,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
    try {
      await axios.post(`http://localhost:7777/api/posts/${postId}/like`);
    } catch (err) {
      console.error("Failed to like post:", err.message);
    }
  };

  const handleComment = async (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
    try {
      await axios.post(`http://localhost:7777/api/posts/${postId}/comment`);
    } catch (err) {
      console.error("Failed to comment on post:", err.message);
    }
  };

  const handleShare = async (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
    try {
      await axios.post(`http://localhost:7777/api/posts/${postId}/share`);
    } catch (err) {
      console.error("Failed to share post:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-[#66FCF1] text-center mb-6">Feed</h2>

        {loading && <p className="text-center text-gray-400">Loading posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {posts.map((post) => (
          <div key={post.id} className="bg-[#1F2833] p-6 rounded-lg shadow-lg mb-6">
            <div className="flex items-center mb-4">
              <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
              <span className="font-bold">{post.user}</span>
            </div>
            <p className="mb-4 text-gray-300">{post.text}</p>
            <img src={post.image} alt="Post" className="w-full rounded-lg mb-4" />
            <div className="flex justify-between text-gray-400">
              <button
                className="hover:text-[#66FCF1] transition"
                onClick={() => handleLike(post.id)}
              >
                👍 {post.likes} Likes
              </button>
              <button
                className="hover:text-[#66FCF1] transition"
                onClick={() => handleComment(post.id)}
              >
                💬 {post.comments} Comments
              </button>
              <button
                className="hover:text-[#66FCF1] transition"
                onClick={() => handleShare(post.id)}
              >
                🔄 {post.shares} Shares
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;