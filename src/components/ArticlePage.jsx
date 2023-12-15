import { getSingleArticle } from "../lib/api";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { SpinnerFull } from "./ui/Spinner";
import ArticleComments from "./ArticleComments";

dayjs.extend(relativeTime);

export default function ArticlePage() {
    const nav = useNavigate();
    const [article, setArticle] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const article = await getSingleArticle(id);
            setArticle(article);
            setIsLoading(false);
        };
        fetchData().catch((err) => {
            nav(`/error/${err.response.status}?msg=${err.response.data.msg}`);
        });
    }, [id]);

    return isLoading ? (
        <SpinnerFull />
    ) : (
        article && (
            <>
                <section className="space-y-4">
                    <header>
                        <h1 className="font-bold text-2xl">{article.title}</h1>
                        <p className="text-sm text-slate-600">
                            By{" "}
                            <a className="text-accent hover:underline" href="/">
                                {article.author}
                            </a>{" "}
                            · {dayjs(article.created_at).fromNow()}
                        </p>
                    </header>

                    <img
                        src={article.article_img_url}
                        alt={`article cover image`}
                        className="w-full"
                    />
                    <article className="text-lg leading-relaxed py-6">
                        {article.body}
                    </article>
                </section>
                <ArticleComments articleId={id} />
            </>
        )
    );
}
