import { Link } from "react-router-dom";
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { vote } from "../lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/* eslint-disable react/prop-types */
export default function ArticleCard(props) {
    const { article } = props;
    const [votes, setVotes] = useState(article.votes);
    const [isVoting, setIsVoting] = useState(false);

    const handleVote = async () => {
        // only attempt to call API if not already in progress
        if (!isVoting) {
            setIsVoting(true);
            try {
                // optimistically update the UI
                setVotes((curr) => curr + 1);
                // update votes in the DB
                await vote(article.article_id);
            } catch (error) {
                // fix UI in event of failure
                setVotes((curr) => curr - 1);
                toast.error("oops! that didn't work 😖");
            } finally {
                setIsVoting(false);
            }
        }
    };

    return (
        <li className="border p-4 list-none rounded shadow-lg space-y-2 bg-background">
            <div className="flex items-center justify-between">
                <p className="text-slate-500">
                    Posted by{" "}
                    <span className="text-accent hover:underline">
                        <Link to={`/articles/${article.article_id}`}>
                            {article.author}
                        </Link>
                    </span>{" "}
                    {dayjs(article.created_at).fromNow()}
                </p>
                <Link
                    to={`/articles?topic=${article.topic}`}
                    className="border-accent border rounded px-2 py-1 text-xs font-bold text-text shadow hover:shadow-lg hover:-translate-y-[1px] hover:translate-x-[1px] transition-all"
                >
                    {article.topic}
                </Link>
            </div>

            <Link
                className="font-bold text-xl hover:underline"
                to={`/articles/${article.article_id}`}
            >
                {article.title}
            </Link>

            <div className="flex gap-4">
                <button
                    disabled={isVoting}
                    onClick={handleVote}
                    className="text-slate-600 flex items-center gap-1 group"
                >
                    <BiUpvote className="group-disabled:text-slate-400" />
                    {votes}
                </button>
                <p className="text-slate-600 flex items-center gap-1">
                    <FaRegCommentDots />
                    {article.comment_count}
                </p>
            </div>
        </li>
    );
}
