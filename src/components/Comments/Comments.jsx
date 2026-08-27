import { Heart, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { useContext } from "react";
import { userContext } from "../../../context/UserContext";
export default function Comments() {
  return (
    <section className="mx-auto w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)]">
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
          24 replies
        </span>
      </header>

      <div className="divide-y divide-slate-100 px-5 sm:px-6">
        <article className="flex gap-3 py-5">
          <img
            src="https://i.pravatar.cc/96?img=47"
            alt="Maya Chen"
            className="h-10 w-10 shrink-0 rounded-2xl object-cover ring-4 ring-violet-50"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Maya Chen</h3>
                <p className="mt-0.5 text-xs text-slate-400">12 min ago</p>
              </div>
              <button
                type="button"
                aria-label="More options for Maya Chen's comment"
                className="rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This is such a thoughtful take. I especially love how you made the
              whole idea feel practical and easy to start.
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-400">
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-rose-500"
              >
                <Heart size={15} /> 18
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-violet-600"
              >
                <MessageCircle size={15} /> Reply
              </button>
            </div>
          </div>
        </article>

        <article className="flex gap-3 py-5">
          <img
            src="https://i.pravatar.cc/96?img=12"
            alt="Alex Morgan"
            className="h-10 w-10 shrink-0 rounded-2xl object-cover ring-4 ring-sky-50"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Alex Morgan
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">28 min ago</p>
              </div>
              <button
                type="button"
                aria-label="More options for Alex Morgan's comment"
                className="rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Bookmarking this for later. The second point really resonates with
              what our team has been working through lately.
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-400">
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-rose-500"
              >
                <Heart size={15} /> 7
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-violet-600"
              >
                <MessageCircle size={15} /> Reply
              </button>
            </div>
          </div>
        </article>

        <article className="ml-8 flex gap-3 border-l-2 border-violet-100 py-5 pl-4 sm:ml-12">
          <img
            src="https://i.pravatar.cc/96?img=32"
            alt="Jordan Lee"
            className="h-9 w-9 shrink-0 rounded-2xl object-cover ring-4 ring-amber-50"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Jordan Lee</h3>
                <p className="mt-0.5 text-xs text-slate-400">34 min ago</p>
              </div>
              <button
                type="button"
                aria-label="More options for Jordan Lee's comment"
                className="rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Yes, exactly this. Great question to keep the conversation going.
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-400">
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-rose-500"
              >
                <Heart size={15} /> 3
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-violet-600"
              >
                <MessageCircle size={15} /> Reply
              </button>
            </div>
          </div>
        </article>
      </div>

      <footer className="border-t border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-50">
          <img
            src="https://i.pravatar.cc/64?img=5"
            alt="Your profile"
            className="h-8 w-8 rounded-xl object-cover"
          />
          <input
            className="min-w-0 flex-1 bg-transparent px-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Add to the conversation..."
            aria-label="Add a comment"
          />
          <button
            type="button"
            aria-label="Send comment"
            className="rounded-2xl bg-violet-600 p-2.5 text-white shadow-sm transition-colors hover:bg-violet-700"
          >
            <Send size={15} />
          </button>
        </div>
      </footer>
    </section>
  );
}
