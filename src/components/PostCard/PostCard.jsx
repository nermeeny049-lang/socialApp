import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Send,
  Share2,
  Trash2,
  ImagePlus,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import { userContext } from "../../context/UserContext";
import axios from "axios";
import { toast } from "sonner";
import Comments from "./Comments/Comments";
import { useFormik } from "formik";
import * as yup from "yup";
import { postContext } from "../../context/PostContext";

export default function PostCard({ PostDetails }) {
  const { token, userInfo } = useContext(userContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [previewImageURL, setPreviewImageURL] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const { setEditingPost } = useContext(postContext);

  const schema = yup.object({
    body: yup.string().min(3, "Caption must be at least 3 characters"),
    image: yup
      .mixed()
      .nullable()
      .test("fileSize", "Image can't exceed 5 MB", (file) => {
        if (!file) return true;

        return file.size <= 5 * 1024 * 1024;
      })
      .test("fileType", "You must upload an image", (file) => {
        if (!file) return true;

        return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
      }),
  });
  async function handlePostLikes() {
    try {
      const options = {
        url: `https://route-posts.routemisr.com/posts/${PostDetails.id}/like`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  async function handlePostDelete() {
    try {
      const options = {
        url: `https://route-posts.routemisr.com/posts/${PostDetails.id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.success) {
        toast.success("Post deleted successfully");
      }
    } catch (error) {
      console.log("error", error.response.data.message);
    }
  }
  const formik = useFormik({
    initialValues: {
      content: "",
      image: null,
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("content", values.content);
        if (values.image) {
          formData.append("image", values.image);
        }
        let url;
        let method;
        if (editingComment) {
          url = `https://route-posts.routemisr.com/posts/${PostDetails._id}/comments/${editingComment._id}`;
          method = "PUT";
        } else {
          url = `https://route-posts.routemisr.com/posts/${PostDetails._id}/comments`;
          method = "POST";
        }
        const options = {
          url,
          method,
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: formData,
        };
        const { data } = await axios.request(options);
        if (data.success) {
          toast.success(
            editingComment
              ? "Comment updated successfully"
              : "Comment created successfully",
          );
          resetForm();
          setEditingComment(null);
          setPreviewImageURL(null);
        }
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    },
  });
  function handleEditComment(comment) {
    formik.setFieldValue("content", comment.content || "");
    formik.setFieldValue("image", null);
    setEditingComment(comment);
    setPreviewImageURL(comment.image || null);
  }
  return (
    <article className="mx-auto mt-10 mb-5 w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)]">
      <header className="flex items-center justify-between px-5 pb-4 pt-5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <img
            className="h-10 w-10 shrink-0 rounded-3xl object-cover ring-4 ring-violet-50"
            src={PostDetails.user.photo}
            alt={PostDetails.user.name}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-sm font-bold text-slate-950">
                {PostDetails.user.name}
              </h2>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                {PostDetails.privacy}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              @{PostDetails.user.username} ·{" "}
              {new Date(PostDetails.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="relative">
          <button
            type="button"
            aria-label="More post options"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <MoreHorizontal size={20} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 top-9 z-10 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-amber-50 hover:text-amber-700"
              >
                <Bookmark size={17} /> Bookmark post
              </button>
              {PostDetails.user._id === userInfo._id && (
                <>
                  <button
                    type="button"
                    onClick={() => setEditingPost(PostDetails)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                  >
                    <Pencil size={17} /> Update post
                  </button>
                  <button
                    type="button"
                    onClick={handlePostDelete}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                  >
                    <Trash2 size={17} /> Delete post
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="px-5 pb-5 sm:px-6">
        <p className="mb-4 text-[1.05rem] text-start font-medium leading-7 text-slate-800">
          {PostDetails.body}
        </p>
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          {PostDetails.image ? (
            <img
              src={PostDetails.image}
              alt="Shared post visual"
              className="block aspect-ratio: 16/10 h-80 w-full object-cover"
            />
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs font-semibold text-slate-500 sm:px-6">
        <span className="flex items-center gap-1.5">
          <Heart size={15} className="text-red-600" /> {PostDetails.likesCount}{" "}
          likes
        </span>
        <span>
          {PostDetails.commentsCount} comment · {PostDetails.sharesCount} shares
        </span>
      </div>

      <div className="mx-5 flex items-center justify-between border-y border-slate-100 py-2 sm:mx-6">
        <button
          type="button"
          onClick={handlePostLikes}
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors  hover:text-rose-600"
        >
          <Heart size={18} /> Like
        </button>
        <button
          type="button"
          onClick={() => {
            setIsCommentsOpen(!isCommentsOpen);
          }}
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors  hover:text-violet-700"
        >
          <MessageCircle size={18} /> Comments
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors  hover:text-sky-700"
        >
          <Share2 size={18} /> Share
        </button>
        <button
          type="button"
          aria-label="Bookmark post"
          className="rounded-xl flex items-center gap-2 text-sm font-semibold text-slate-600 p-2  transition-colors hover:bg-amber-50 hover:text-amber-600"
        >
          <Bookmark size={18} /> Save
        </button>
      </div>
      {isCommentsOpen && (
        <Comments postId={PostDetails.id} onEditComment={handleEditComment} />
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-slate-50/80 px-5 py-4 sm:px-6">
          <div className=" flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-50">
            <textarea
              className="w-full resize-none flex-1 bg-transparent px-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              placeholder="Write a comment..."
              aria-label="Write a comment"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            <label className="group block relative cursor-pointer overflow-hidden rounded-2xl bg-slate-50/70 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const image = e.target.files[0];
                  formik.setFieldValue("image", image);
                  const imageURL = URL.createObjectURL(image);
                  setPreviewImageURL(imageURL);
                }}
                name="image"
                onBlur={formik.handleBlur}
              />
              {previewImageURL && (
                <div>
                  <div className="relative">
                    <img
                      src={previewImageURL}
                      className="max-h-24 w-24 object-cover rounded-2xl"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 rounded-full bg-black text-white hover:bg-black/60 p-0.5 transition-colors"
                      onClick={() => {
                        setPreviewImageURL(null);
                        formik.setFieldValue("image", null);
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              )}
              {!previewImageURL && (
                <span className=" flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-600  transition-transform group-hover:bg-violet-100">
                  <ImagePlus size={23} strokeWidth={1.8} />
                </span>
              )}
            </label>
            <button
              type="submit"
              aria-label="Send comment"
              className="rounded-2xl bg-violet-600 p-2 text-white shadow-sm transition-colors hover:bg-violet-900"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </form>
    </article>
  );
}
