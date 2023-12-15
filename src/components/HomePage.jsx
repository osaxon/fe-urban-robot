import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../lib/api";
import Feed from "./Feed";
import SortAndFilter from "./SortAndFilter";

export default function HomePage() {
    const [sortState, setSortState] = useState({
        sortBy: "Votes",
        order: "DESC",
    });

    const { data } = useQuery({
        queryKey: ["topics"],
        queryFn: getTopics,
    });

    return (
        <>
            <section className="py-6 px-4 bg-primary rounded text-text-primary space-y-6">
                <h1 className="font-bold text-2xl text-center">
                    Welcome to NC News!
                </h1>
                <h2 className="text-xl text-center">
                    The backpage of the internet
                </h2>
            </section>
            <section
                data-inverted
                className="bg-slate-500 bg-opacity-10 shadow-md p-4 my-4 rounded transition-all"
            >
                <h3 className="font-bold text-lg text-text">Topics</h3>
                <p className="text-text">
                    Select a topic to view related articles
                </p>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 py-4">
                    {data &&
                        data.topics &&
                        data.topics.map(({ slug, description }) => (
                            <li
                                className="list-none p-2 border rounded"
                                key={slug}
                            >
                                <Link
                                    className="hover:underline"
                                    to={`/?topic=${slug}`}
                                >
                                    {slug}
                                    <p className="text-sm">{description}</p>
                                </Link>
                            </li>
                        ))}
                </ul>
            </section>
            <SortAndFilter sortState={sortState} setSortState={setSortState} />

            <Feed sort={sortState} />
        </>
    );
}
