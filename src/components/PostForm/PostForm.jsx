import {
  Camera,
  Globe,
  ImagePlus,
  MapPin,
  Smile,
  Image,
  X,
} from "lucide-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../context/UserContext";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { postContext } from "../../context/PostContext";

export default function PostForm({
  commentToEdit,
  onCommentUpdated,
  onCancelCommentEdit,
}) {
  const { token, userInfo } = useContext(userContext);
  const [previewImageURL, setPreviewImageURL] = useState(null);
  const { editingPost, setEditingPost } = useContext(postContext);
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
  const formik = useFormik({
    initialValues: {
      body: "",
      image: null,
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const myFormData = new FormData();
        if (values.body) {
          myFormData.append("body", values.body);
        }
        if (values.image instanceof File) {
          myFormData.append("image", values.image);
        }
        const options = {
          url: editingPost
            ? `https://route-posts.routemisr.com/posts/${editingPost._id}`
            : "https://route-posts.routemisr.com/posts",
          method: editingPost ? "PUT" : "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: myFormData,
        };
        const { data } = await axios.request(options);
        console.log("Response:", data);
        if (data.success) {
          toast.success(
            editingPost
              ? "Post updated successfully"
              : "Post created successfully",
          );
          resetForm();
          setPreviewImageURL(null);
          setEditingPost(null);
        }
      } catch (error) {
        console.log(error.response?.data);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  useEffect(() => {
    if (editingPost) {
      formik.setValues({ body: editingPost.body, image: null });
      setPreviewImageURL(editingPost.image || null);
    }
  }, [editingPost]);
  useEffect(() => {
    if (editingPost) {
      formik.setFieldValue("body", editingPost.body || "");
      setPreviewImageURL(editingPost.image || null);
    }
  }, [editingPost]);
  return (
    <section className="mx-auto mt-10 w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)]">
      <div className="border-b border-slate-100 px-4 py-3 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-violet-100 text-sm font-extrabold text-violet-700 ring-4 ring-violet-50">
              <img
                src={userInfo?.photo}
                alt="Profile"
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-slate-950">
                {editingPost ? "Update Post" : "Create a post"}
              </h1>
              <button
                type="button"
                className="mt-1 inline-flex justify-center items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-violet-700"
              >
                <Globe size={13} />
                <span>Public</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-2 px-5 py-5 sm:px-6 sm:py-6">
          <textarea
            aria-label="Post caption"
            value={formik.values.body}
            onChange={formik.handleChange}
            name="body"
            onBlur={formik.handleBlur}
            placeholder={
              editingPost ? "Rewrite your post..." : "What is on your mind?"
            }
            className="min-h-5 w-full resize-none bg-transparent text-lg leading-7 text-slate-800 outline-none placeholder:text-slate-400"
          />
          {previewImageURL && (
            <div className="px-4 pb-3 ">
              <div className="relative">
                <img
                  src={previewImageURL}
                  className="max-h-96 w-full object-cover rounded-2xl"
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
          <label className="group relative block cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 transition-colors hover:border-violet-300 hover:bg-violet-50/40">
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
            {!previewImageURL && (
              <div className="flex min-h-36 flex-col items-center justify-center px-6 py-8 text-center">
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm ring-1 ring-slate-200 transition-transform group-hover:-translate-y-1">
                  <ImagePlus size={23} strokeWidth={1.8} />
                </span>
                <p className="text-sm font-bold text-slate-700">Add a photo</p>
                <p className="mt-1 text-xs text-slate-500">
                  Drag and drop or click to browse from your device
                </p>
              </div>
            )}
          </label>
          {formik.touched.body && formik.errors.body && (
            <p className="text-xs text-red-500">{formik.errors.body}</p>
          )}
          {formik.touched.image && formik.errors.image && (
            <p className="text-xs text-red-500">{formik.errors.image}</p>
          )}

          <div className="flex items-center justify-between gap-4 pt-1">
            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-bold text-white shadow-[0_10px_20px_-10px_rgba(124,58,237,0.8)] transition-colors hover:bg-violet-700"
            >
              {editingPost ? "Update Post" : "Create Post"}
            </button>
            {editingPost && (
              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  setPreviewImageURL(null);
                  setEditingPost(null);
                }}
                className="text-sm font-bold text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
