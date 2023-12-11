import { getArticles } from "../utils/api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { Link, useParams } from "react-router-dom";

export default function Feed() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalArticles, setTotalArticles] = useState(0);
    const { p } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { articles, total_count } = await getArticles(p);
            setArticles(articles);
            setTotalArticles(total_count);
            setIsLoading(false);
        };
        fetchData().catch((error) => console.log(error));
    }, [p]);

    return isLoading ? (
        "loading..."
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
                        <Link
                            className="border p-2 rounded"
                            key={i}
                            to={`/${i + 1}`}
                        >
                            {i + 1}
                        </Link>
                    )
                )}
            </ul>
        </section>
    );
}
