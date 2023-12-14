/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { getArticles } from "../lib/api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SpinnerFull } from "./ui/Spinner";

export default function Feed({ sort }) {
    const nav = useNavigate();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(undefined);
    const [totalArticles, setTotalArticles] = useState(0);
    const [search, setSearch] = useSearchParams();

    const page = search.get("p");
    const topic = search.get("topic");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { articles, total_count } = await getArticles(
                page ?? 1,
                topic,
                sort
            );
            setArticles(articles);
            setTotalArticles(total_count);
            setIsLoading(false);
        };
        fetchData()
            .catch((error) => {
                setIsError(true);
                setError(error.response);
                nav(
                    `/error/${error.response.status}?msg=${error.response.data.msg}`
                );
            })
            .finally(() => setIsLoading(false));
    }, [page, topic]);

    const nextPage = (currentPage) => {
        let searchParams = { p: currentPage + 1 };
        if (topic) {
            searchParams.topic = topic;
        }
        setSearch(searchParams);
    };

    return isLoading ? (
        <SpinnerFull />
    ) : isError ? (
        <div>{JSON.stringify(error, null, 2)}</div>
    ) : (
        <section>
            <ul className="space-y-4">
                {articles &&
                    articles.map((article) => {
                        return (
                            <ArticleCard
                                key={article.article_id}
                                article={article}
                            />
                        );
                    })}
            </ul>
            <ul className="p-2 flex gap-2 items-center justify-end">
                {Array.from({ length: Math.ceil(totalArticles / 10) }).map(
                    (val, i) => (
                        <button
                            className="border p-2 rounded"
                            key={i}
                            onClick={() => nextPage(i)}
                        >
                            {i + 1}
                        </button>
                    )
                )}
            </ul>
        </section>
    );
}
