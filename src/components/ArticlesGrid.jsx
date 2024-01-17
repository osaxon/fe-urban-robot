import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getArticlesByTopic, getTopic } from "../lib/api";
import BackToAll from "./ui/BackToAll";
import { SpinnerFull } from "./ui/Spinner";

export default function ArticlesGrid() {
    const { topic } = useParams();
    console.log(topic, "params");

    const { data: topicData, status: topicStatus } = useQuery({
        queryKey: ["topic", topic],
        queryFn: async () => await getTopic(topic),
    });

    const { data, status: articlesStatus } = useQuery({
        queryKey: ["articles", topic],
        queryFn: async () => await getArticlesByTopic(topic),
    });

    console.log(data);

    if (articlesStatus === "pending" || topicStatus === "pending")
        return <SpinnerFull />;

    return (
        <main className="content-grid">
            <header className="py-12 space-y-6">
                <h1 className="font-bold text-2xl text-center">
                    Articles about {topic}
                </h1>
                <p className="text-center">{topicData.topic.description}</p>
            </header>
            <BackToAll />
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 breakout gap-2">
                {data.articles?.map((article) => (
                    <article
                        key={article.article_id}
                        className="bg-background rounded-sm shadow-md p-4"
                    >
                        <img src={article.article_img_url} alt="" />
                        <Link to={`/articles/${article.article_id}`}>
                            <h2 className="font-bold text-md">
                                {article.title}
                            </h2>
                        </Link>
                        <p className="text-sm text-gray-400">
                            {article.author} |{" "}
                            {dayjs(article.created_at).fromNow()}
                        </p>
                        <p className="text-sm text-gray-400">
                            {article.comment_count} comments | {article.votes}{" "}
                            votes
                        </p>
                    </article>
                ))}
            </section>
        </main>
    );
}
