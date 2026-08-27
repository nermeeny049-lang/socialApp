import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/UserContext";
import PostCard from "../../components/PostCard/PostCard";
import PostForm from "../../components/PostForm/PostForm";

export default function Home() {
  const [posts, setPosts] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);
  const { token } = useContext(userContext);
  async function getHomeFeed() {
    const options = {
      url: "https://route-posts.routemisr.com/posts",
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.request(options);
    setPosts(data.data.posts);
  }
  useEffect(() => {
    getHomeFeed();
  }, []);

  return (
    <>
      <div className=" relative left-64 w-[calc(100%-16rem)]">
        <PostForm
          commentToEdit={commentToEdit}
          onCommentUpdated={() => setCommentToEdit(null)}
          onCancelCommentEdit={() => setCommentToEdit(null)}
        />
        {posts ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              PostDetails={post}
              onEditComment={setCommentToEdit}
            />
          ))
        ) : (
          <p className="text-center text-slate-500 mt-20">Loading...</p>
        )}
      </div>
    </>
  );
}
