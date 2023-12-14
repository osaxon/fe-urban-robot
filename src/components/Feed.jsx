/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { getArticles } from "../lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";
import { SpinnerFull } from "./ui/Spinner";
import { cn } from "../lib/utils";

export default function Feed({ sort }) {
    const [search, setSearch] = useSearchParams();

    const page = search.get("p");
    const topic = search.get("topic");

    const { data, isLoading, isError, error, isFetching, isPlaceholderData } =
        useQuery({
            queryKey: ["articles", page, { topic, sort }],
            queryFn: async () => {
                try {
                    const data = await getArticles(page || 1, { topic, sort });
                    return data;
                } catch (error) {
                    throw new Error("error");
                }
            },
            placeholderData: keepPreviousData,
        });

    const changePage = (selectedPage) => {
        let searchParams = { p: selectedPage };
        if (topic) {
            searchParams.topic = topic;
        }
        setSearch(searchParams);
    };

    return isLoading ? (
        <SpinnerFull />
    ) : (
        <section>
            <ul className="space-y-4">
                {data &&
                    data.articles.map((article) => {
                        return (
                            <ArticleCard
                                key={article.article_id}
                                article={article}
                            />
                        );
                    })}
            </ul>
            <ul className="flex items-center gap-2 justify-end py-4">
                {Array.from({ length: Math.ceil(data.total_count / 10) }).map(
                    (el, i) => {
                        return (
                            <li
                                className={cn(
                                    "px-2 py-1 border rounded transition-colors shadow-md",
                                    +page === i + 1 &&
                                        "bg-emerald-400 ring-2 ring-emerald-200"
                                )}
                                key={i + 1}
                            >
                                <button
                                    disabled={+page === i + 1}
                                    className="disabled:text-emerald-900 transition-colors"
                                    onClick={() => changePage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        );
                    }
                )}
            </ul>
        </section>
    );
}
