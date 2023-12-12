/* eslint-disable react/prop-types */
import { getArticleComments } from "../lib/api";
import { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { Spinner, SpinnerFull } from "./ui/Spinner";
import { UserContext } from "../context/userContext";
import { postComment } from "../lib/api";
import { toast } from "react-hot-toast";

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
        // snapshot current comment state
        const prevComments = comments;

        try {
            setIsPosting(true);
            // optimistically update the UI
            setComments((curr) => [newComment, ...curr]);
            // add comment to DB
            await postComment(articleId, {
                username: user,
                body: newComment.body,
            });
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

    return isLoading ? (
        <SpinnerFull />
    ) : (
        <section className="space-y-6">
            <form className="flex items-center gap-4" onSubmit={submitComment}>
                <p>Logged in as: {user}</p>
                <textarea
                    onChange={(e) =>
                        setNewComment({
                            author: user,
                            body: e.target.value,
                            comment_id: user,
                            created_at: new Date(),
                        })
                    }
                    className="border rounded w-full"
                    type="text"
                    value={newComment.body}
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
