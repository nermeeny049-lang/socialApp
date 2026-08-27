import {
  CalendarDays,
  Camera,
  Link,
  MapPin,
  MoreHorizontal,
  Pencil,
  KeyRound,
  UserPlus,
  Grid3x3,
  User,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router";
import { userContext } from "../../context/UserContext";
import { postContext } from "../../context/PostContext";
import PostCard from "../../components/PostCard/PostCard";
import axios from "axios";
import PostForm from "../../components/PostForm/PostForm";
export default function Profile() {
  const { userInfo, token } = useContext(userContext);
  const { setIsPostFormOpen } = useContext(postContext);
  const [posts, setPosts] = useState([]);
  if (!userInfo) {
    return;
  }
  async function getMyPosts() {
    try {
      const options = {
        url: `https://route-posts.routemisr.com/users/${userInfo._id}/posts`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      setPosts(data.data.posts);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (userInfo?._id && token) {
      getMyPosts();
    }
  }, [userInfo?._id, token]);
  return (
    <main className="min-h-screen bg-[#f7f7f4] pl-64 text-slate-900">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-900">
              Your space
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Profile</h1>
          </div>
          <button
            type="button"
            aria-label="More profile options"
            className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>

        <section className="overflow-hidden rounded-4xl border border-slate-200/80 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.45)]">
          <div className="relative h-52 overflow-hidden bg-linear-to-br from-[#f4c98a] via-[#e9a77d] to-[#d78376] sm:h-64">
            <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border-34 border-white/15" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#b45755]/20 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-slate-900/20 to-transparent" />
            <button
              type="button"
              aria-label="Change cover photo"
              className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-slate-700 shadow-lg backdrop-blur transition hover:bg-white"
            >
              <Camera size={15} />
              Edit cover
            </button>
          </div>

          <div className="px-5 pb-6 sm:px-8 lg:px-10">
            <div className="-mt-16 flex flex-col gap-5 sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">
              <div className="relative w-fit">
                <img
                  src={userInfo.photo}
                  alt="Mony Yasser"
                  className="h-32 w-32 rounded-4xl border-[6px] border-white bg-slate-100 object-cover shadow-xl sm:h-40 sm:w-40"
                />
                <span className="absolute bottom-0 right-0 rounded-full bg-slate-900 text-white p-1.5  shadow transition">
                  <Camera />
                </span>
              </div>
              <div className="flex flex-wrap gap-2 sm:pb-2">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-700"
                >
                  <Pencil size={16} />
                  Edit profile
                </button>
                <RouterLink
                  to="/repassword"
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                >
                  <KeyRound size={16} />
                  Change password
                </RouterLink>
                <button
                  type="button"
                  aria-label="Add friend"
                  className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:border-slate-300"
                >
                  <UserPlus size={18} />
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  {userInfo.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  @{userInfo.username}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    Joined at:{" "}
                    {new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    Born:{" "}
                    {new Date(userInfo.dateOfBirth).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Link size={14} /> {userInfo.email}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <User size={14} /> {userInfo.gender}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-13 rounded-2xl bg-purple-100 px-6 py-4 lg:self-start">
                <div>
                  <p className="text-xl font-bold text-center">
                    {userInfo.bookmarksCount}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Bookmarks
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-center">
                    {userInfo.followersCount}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Followers
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-center">
                    {userInfo.followingCount}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Following
                  </p>
                </div>
              </div>
            </div>

            <nav className="mt-8 flex gap-7 border-b border-slate-100 text-sm font-bold">
              <button
                type="button"
                className="border-b-2 border-purple-900 pb-4 text-slate-900"
              >
                Posts
              </button>
              <button
                type="button"
                className="pb-4 text-slate-400 transition hover:text-slate-700"
              >
                Bookmarks
              </button>
              <button
                type="button"
                className="pb-4 text-slate-400 transition hover:text-slate-700"
              >
                About
              </button>
            </nav>
          </div>
        </section>

        <section className="mt-6 rounded-4xl border border-slate-200/80 bg-white px-6 py-12 text-center shadow-[0_16px_50px_-40px_rgba(15,23,42,0.5)] sm:px-10">
          <PostForm />
          {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <PostCard key={post._id} PostDetails={post} />
              ))}
            </div>
          ) : (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-600">
                <Grid3x3 size={28} strokeWidth={1.7} />
              </div>
              <section>Nothing here yet</section>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Mony&apos;s posts will appear here when the first story is
                shared.
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
