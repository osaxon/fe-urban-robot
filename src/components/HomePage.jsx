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
            <section className="py-12">
                <h1 className="font-bold text-2xl text-center">
                    Welcome to NC News!
                </h1>
                <h2 className="text-xl text-center">
                    The backpage of the internet
                </h2>
            </section>
            <SortAndFilter sortState={sortState} setSortState={setSortState} />
            <section className="bg-slate-50 shadow-md p-4 my-4 rounded transition-all">
                <h3 className="font-bold text-lg text-slate-900">Topics</h3>
                <p className="text-slate-700">
                    Select a topic to view related articles
                </p>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 py-4">
                    {data &&
                        data.topics &&
                        data.topics.map(({ slug, description }) => (
                            <li
                                className="list-none p-2 bg-white border rounded"
                                key={slug}
                            >
                                <Link
                                    className="hover:underline"
                                    to={`/articles?topic=${slug}`}
                                >
                                    {slug}
                                </Link>
                                <p className="text-sm">{description}</p>
                            </li>
                        ))}
                </ul>
            </section>

            <Feed sort={sortState} />
        </>
    );
}
