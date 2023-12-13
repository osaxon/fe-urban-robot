import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../lib/api";
import Feed from "./Feed";

export default function HomePage() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { topics } = await getTopics();
            setTopics(topics);
        };
        fetchData();
    }, []);

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
            <section className="bg-slate-50 p-4 my-4 rounded transition-all">
                <h3 className="font-bold text-lg text-slate-900">Topics</h3>
                <p className="text-slate-700">
                    Select a topic to view related articles
                </p>
                <ul className="flex items-center flex-wrap gap-2 py-4">
                    {topics.map(({ slug }) => (
                        <li
                            className="list-none bg-emerald-300 border-emerald-500 text-emerald-900 font-semibold hover:bg-emerald-200 transition-colors border rounded"
                            key={slug}
                        >
                            <Link
                                className="text-xs p-1 inline-flex items-center"
                                to={`/articles?topic=${slug}`}
                            >
                                {slug}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <Feed />
        </>
    );
}
