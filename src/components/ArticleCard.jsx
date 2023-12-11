import { Link } from "react-router-dom";
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/* eslint-disable react/prop-types */
export default function ArticleCard(props) {
    const { article } = props;
    return (
        <li className="border p-4 list-none rounded shadow-lg space-y-2">
            <div className="flex items-center justify-between">
                <p className="text-slate-600">
                    Posted by{" "}
                    <span className="text-emerald-600 hover:underline">
                        <Link to={`/articles/${article.article_id}`}>
                            {article.author}
                        </Link>
                    </span>{" "}
                    {dayjs(article.created_at).fromNow()}
                </p>
                <button className="border-emerald-400 border rounded-lg p-1 bg-emerald-300 text-xs font-bold text-emerald-800">
                    {article.topic}
                </button>
            </div>

            <Link
                className="font-bold text-xl hover:underline"
                to={`/articles/${article.article_id}`}
            >
                {article.title}
            </Link>

            <div className="flex gap-4">
                <button className="text-slate-600 flex items-center gap-1">
                    <BiUpvote />
                    {article.votes}
                </button>
                <p className="text-slate-600 flex items-center gap-1">
                    <FaRegCommentDots />
                    {article.comment_count}
                </p>
            </div>
        </li>
    );
}
