import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Trash2,
  Pencil,
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { userContext } from "../../../context/UserContext";
import axios from "axios";
import { toast } from "sonner";
import * as yup from "yup";
import { useFormik } from "formik";
export default function Comments({ postId, onEditComment }) {
  const [comments, setComments] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, userInfo } = useContext(userContext);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  async function displayComments() {
    try {
      const options = {
        url: `https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=10`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      console.log(data.data.comments);
      setComments(data.data.comments);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  async function handleCommentDelete(commentId) {
    try {
      const options = {
        url: `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.success) {
        toast.success("Comment deleted successfully");
      }
    } catch (error) {
      console.log("error", error.response.data.message);
    }
  }
  function startEditComment(comment) {
    setEditingCommentId(comment._id);
    setEditContent(comment.content || "");
    setEditPreview(comment.image || null);
    setEditImage(null);
    console.log("Editing comment:", comment);
  }
  useEffect(() => {
    displayComments();
  }, [postId]);
  return (
    <section className="mx-auto w-full max-w-xl overflow-hidden rounded-b-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)]">
      <header className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600">
            Community
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
            Comments
          </h2>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
          {comments.length} replies
        </span>
      </header>

      <div className="divide-y divide-slate-100 px-5 sm:px-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <article key={comment._id} className="flex gap-3 py-5">
              <img
                src={comment.commentCreator.photo}
                alt={comment.commentCreator.name}
                className="h-10 w-10 shrink-0 rounded-2xl object-cover ring-4 ring-violet-50"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {comment.commentCreator.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      aria-label="More comment options"
                      aria-expanded={isMenuOpen}
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 top-9 z-10 w-48 rounded-2xl bg-white p-1.5 shadow-xl shadow-slate-900/10">
                        {userInfo._id === comment.commentCreator._id && (
                          <>
                            <button
                              type="button"
                              onClick={() => onEditComment(comment)}
                              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                            >
                              <Pencil size={17} /> Update comment
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCommentDelete(comment._id)}
                              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                            >
                              <Trash2 size={17} /> Delete comment
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {comment.content}
                </p>
                <div className="overflow-hidden max-w-50 cover max-h-50 rounded-2xl bg-slate-100">
                  {comment.image ? (
                    <img
                      src={comment.image}
                      alt="Shared post visual"
                      className="block aspect-ratio: 16/10 h-80 w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-400">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 hover:text-rose-500"
                  >
                    <Heart size={15} />
                    {comment.likes.length}
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="py-8 text-center text-sm text-slate-500">
            There are no comments yet.
          </p>
        )}
      </div>
    </section>
  );
}
