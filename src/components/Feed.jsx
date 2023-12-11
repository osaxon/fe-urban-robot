import { getArticles } from "../utils/api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

export default function Feed() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { articles } = await getArticles();
            setArticles(articles);
            setIsLoading(false);
        };
        fetchData().catch((error) => console.log(error));
    }, []);

    return isLoading ? (
        "loading..."
    ) : (
        <section>
            {articles &&
                articles.map((article) => {
                    return (
                        <ArticleCard
                            key={article.article_id}
                            article={article}
                        />
                    );
                })}
        </section>
    );
}
