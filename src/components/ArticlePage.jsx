import { getArticlePageData } from "../utils/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function ArticlePage() {
    const [article, setArticle] = useState();
    const [comments, setComments] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [article, commentData] = await getArticlePageData(id);
            const { comments } = commentData;
            setArticle(article);
            setComments(comments);
            setIsLoading(false);
        };
        fetchData();
    }, [id]);

    return isLoading
        ? "loading..."
        : article && (
              <section className="space-y-4">
                  <h1 className="font-bold text-2xl">{article.title}</h1>
                  <article className="text-lg">{article.body}</article>
                  <div>{article.comment_count} comments</div>
                  <article>
                      <ul className="space-y-4">
                          {comments.map((comment) => (
                              <li key={comment.comment_id}>
                                  <span className="text-slate-700">
                                      {comment.author} -{" "}
                                      {dayjs(comment.created_at).fromNow()}
                                  </span>
                                  <div>{comment.body}</div>
                              </li>
                          ))}
                      </ul>
                  </article>
              </section>
          );
}
