/* eslint-disable react/prop-types */
import { getArticleComments } from "../lib/api";
import { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { Spinner, SpinnerFull } from "./ui/Spinner";
import { UserContext } from "../context/userContext";
import { postComment } from "../lib/api";

export default function ArticleComments({ articleId }) {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        const { comments } = await getArticleComments(articleId);
        setComments(comments);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const submitComment = async (e) => {
        e.preventDefault();
        try {
            setIsPosting(true);
            await postComment(articleId, {
                username: user,
                body: newComment,
            });
            // refetch comments and update UI...
            fetchData();
        } catch (error) {
            console.error(error);
        } finally {
            setIsPosting(false);
            setNewComment("");
        }
    };

    return isLoading ? (
        <SpinnerFull />
    ) : (
        <section className="space-y-6">
            <form className="flex items-center gap-4" onSubmit={submitComment}>
                <p>Logged in as: {user}</p>
                <textarea
                    onChange={(e) => setNewComment(e.target.value)}
                    className="border rounded w-full"
                    type="text"
                    value={newComment}
                />
                <button className="border p-2 rounded">
                    {isPosting ? <Spinner /> : "Comment"}
                </button>
            </form>
            <ul className="space-y-4">
                {comments &&
                    comments.map((comment) => (
                        <li key={comment.comment_id}>
                            <span className="text-slate-700">
                                {comment.author} -{" "}
                                {dayjs(comment.created_at).fromNow()}
                            </span>
                            <p className="leading-relaxed">{comment.body}</p>
                        </li>
                    ))}
            </ul>
        </section>
    );
}
