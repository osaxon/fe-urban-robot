import { useQuery } from "@tanstack/react-query";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiPostgresql } from "react-icons/si";

import { useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../lib/api";
import Feed from "./Feed";
import SortAndFilter from "./SortAndFilter";

export default function HomePage() {
    const [sortState, setSortState] = useState({
        sortBy: "Votes",
        order: "DESC",
        topic: undefined,
    });

    const { data } = useQuery({
        queryKey: ["topics"],
        queryFn: getTopics,
    });

    return (
        <main className="content-grid">
            <section className="py-6 bg-background full-width min-h-[30dvh] px-4 text-text space-y-6">
                <header>
                    <h1 className="font-bold text-3xl md:text-5xl">
                        Welcome to NC News!
                    </h1>
                    <h2 className="text-xl">The backpage of the internet</h2>
                </header>
                <article className="space-y-4">
                    <p>
                        A project built by{" "}
                        <a
                            className="text-accent hover:underline"
                            href="https://github.com/osaxon"
                        >
                            Oli Saxon
                        </a>{" "}
                        to showcase skills with React and Node.JS.
                    </p>
                    <p>
                        To see more of my work, check out my personal site and
                        portfolio{" "}
                        <a
                            className="text-accent hover:underline"
                            href="https://olisaxon.co.uk"
                        >
                            here.
                        </a>
                    </p>
                    <div className="flex items-center gap-2">
                        <FaReact className="w-12 h-12 animate-rotate" />
                        <FaNodeJs className="w-12 h-12 " />
                        <SiPostgresql className="w-12 h-12 " />
                    </div>
                </article>
            </section>
            <section
                data-inverted
                className="bg-background border shadow-md p-4 my-4 rounded transition-all"
            >
                <h3 className="font-bold text-lg text-text">Topics</h3>
                <p className="text-text">View articles by topic</p>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 py-4">
                    {data &&
                        data.topics &&
                        data.topics.map(({ slug, description }) => (
                            <li
                                className="list-none p-2 border rounded"
                                key={slug}
                            >
                                <Link
                                    className="hover:underline text-sm"
                                    to={`/topics/${slug}/articles`}
                                >
                                    {slug}
                                    <p>{description}</p>
                                </Link>
                            </li>
                        ))}
                </ul>
            </section>
            <SortAndFilter sortState={sortState} setSortState={setSortState} />

            <Feed sort={sortState} />
        </main>
    );
}
