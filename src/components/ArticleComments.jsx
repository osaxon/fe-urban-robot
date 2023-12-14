/* eslint-disable react/prop-types */
import { getArticleComments } from "../lib/api";
import { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { MdDelete } from "react-icons/md";
import { Spinner, SpinnerFull } from "./ui/Spinner";
import { UserContext } from "../context/userContext";
import { postComment, deleteComment } from "../lib/api";
import { toast } from "react-hot-toast";
import { cn } from "../lib/utils";

export default function ArticleComments({ articleId }) {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState({
        author: user.username,
        body: "",
        comment_id: user.username,
        created_at: new Date(),
    });
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
        // snapshot current comment state
        const prevComments = comments;

        try {
            setIsPosting(true);
            // optimistically update the UI
            setComments((curr) => [newComment, ...curr]);
            // add comment to DB
            const { comment: savedComment } = await postComment(articleId, {
                username: user.username,
                body: newComment.body,
            });
            // update UI state with the saved comment details
            setComments([savedComment, ...prevComments]);
        } catch (error) {
            console.error(error);
            // revert to snapshot in event of error when isnerting comments
            setComments(prevComments);
            toast.error("Oops! something went wrong.");
        } finally {
            setIsPosting(false);
            setNewComment({
                author: "",
                body: "",
                created_at: null,
                comment_id: undefined,
            });
            toast.success("Thanks!");
        }
    };

    const removeComment = async (commentId) => {
        const commentSnapshot = comments;
        const updatedComments = comments.filter(
            ({ comment_id }) => comment_id !== commentId
        );
        setComments(updatedComments);
        try {
            await deleteComment(commentId);
            toast.success("Comment deleted");
        } catch (error) {
            toast.error("Oops! that didn't work");
            setComments(commentSnapshot);
        }
    };

    return isLoading ? (
        <SpinnerFull />
    ) : (
        <section className="space-y-6 py-4">
            <form
                className="flex flex-col border-b py-2 bg-slate-50 p-4 rounded"
                onSubmit={submitComment}
            >
                <p className="text-sm">
                    Comment as{" "}
                    <a className="text-emerald-600 hover:underline" href="/">
                        {user.username}
                    </a>
                </p>
                <textarea
                    onChange={(e) =>
                        setNewComment({
                            author: user.username,
                            body: e.target.value,
                            comment_id: user.username,
                            created_at: new Date(),
                        })
                    }
                    placeholder="Tell us your thoughts"
                    className="border rounded w-full p-2"
                    type="text"
                    value={newComment.body}
                />
                <p
                    className={cn(
                        "text-sm",
                        newComment.body.length > 199 && "text-red-500"
                    )}
                >
                    {newComment.body.length} / 200
                </p>
                <button
                    disabled={newComment.body.length > 199}
                    type="submit"
                    className="disabled:opacity-50 disabled:cursor-not-allowed border my-2 place-self-end py-1 px-2 rounded text-sm h-full bg-emerald-600 text-emerald-50"
                >
                    {isPosting ? <Spinner /> : "Comment"}
                </button>
            </form>

            <ul className="space-y-4">
                {comments &&
                    comments.map((comment) => (
                        <li
                            className={cn(
                                "border p-2 rounded",
                                comment.author === user.username &&
                                    "border-2 border-emerald-300 bg-emerald-50"
                            )}
                            key={comment.comment_id}
                        >
                            <div className="text-slate-700 flex justify-between">
                                <p>
                                    {comment.author === user.username
                                        ? "you"
                                        : comment.author}{" "}
                                    · {dayjs(comment.created_at).fromNow()}
                                </p>
                                {comment.author === user.username && (
                                    <button
                                        onClick={() =>
                                            removeComment(comment.comment_id)
                                        }
                                        className="group"
                                    >
                                        <MdDelete className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" />
                                    </button>
                                )}
                            </div>
                            <p className="leading-relaxed">{comment.body}</p>
                        </li>
                    ))}
            </ul>
        </section>
    );
}
