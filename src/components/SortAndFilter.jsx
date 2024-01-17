/* eslint-disable react/prop-types */
import { TbSortDescendingNumbers } from "react-icons/tb";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { TbFilter } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";

import { MdOutlineCategory } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getTopics } from "../lib/api";

const sortByOpts = [
    {
        label: "Date",
        val: "created_at",
    },
    {
        label: "Comments",
        val: "comment_count",
    },
    {
        label: "Votes",
        val: "votes",
    },
];

const orderOpts = [
    {
        label: "ASC",
        icon: TbSortAscendingNumbers,
    },
    {
        label: "DESC",
        icon: TbSortDescendingNumbers,
    },
];

export default function SortAndFilter() {
    const [search, setSearch] = useSearchParams();

    const { data } = useQuery({
        queryKey: ["topics"],
        queryFn: getTopics,
    });

    return (
        <aside className="flex items-center gap-4 my-4 text-text justify-end">
            <div className="flex flex-col">
                <label
                    className="text-text text-sm flex items-center"
                    htmlFor="sortBy"
                >
                    <TbFilter />
                    Topic
                </label>
                <select
                    value={search.get("topic") || undefined}
                    onChange={(e) => {
                        if (e.target.value === "All") {
                            setSearch();
                            return;
                        }
                        let searchParams = { topic: e.target.value };
                        if (search.get("sort")) {
                            searchParams.sort = search.get("sort");
                        }
                        if (search.get("order")) {
                            searchParams.order = search.get("order");
                        }
                        setSearch(searchParams);
                    }}
                    name="topic"
                    id="topic"
                    className="border rounded p-1 text-xs text-slate-600 shadow-sm"
                >
                    <option value={undefined}>All</option>
                    {data &&
                        data.topics.map(({ slug }) => (
                            <option value={slug} key={slug}>
                                {slug}
                            </option>
                        ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label
                    className="text-text text-sm flex items-center"
                    htmlFor="sortBy"
                >
                    <MdOutlineCategory />
                    Sort By
                </label>
                <select
                    value={search.get("sort") || undefined}
                    onChange={(e) => {
                        let searchParams = { sort: e.target.value };
                        if (search.get("topic")) {
                            searchParams.topic = search.get("topic");
                        }
                        if (search.get("order")) {
                            searchParams.order = search.get("order");
                        }
                        setSearch(searchParams);
                    }}
                    name="sortBy"
                    id="sortBy"
                    className="border rounded p-1 text-xs text-slate-600 shadow-sm"
                >
                    {sortByOpts.map(({ label, val }) => (
                        <option value={val} key={val}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label className=" text-sm flex items-center" htmlFor="sortBy">
                    {search.get("order") === "DESC" ? (
                        <TbSortDescendingNumbers />
                    ) : (
                        <TbSortAscendingNumbers />
                    )}
                    Order
                </label>
                <select
                    value={search.get("order") || undefined}
                    onChange={(e) => {
                        let searchParams = { order: e.target.value };
                        if (search.get("topic")) {
                            searchParams.topic = search.get("topic");
                        }
                        if (search.get("sort")) {
                            searchParams.sort = search.get("sort");
                        }
                        setSearch(searchParams);
                    }}
                    name="sortBy"
                    className="border rounded text-slate-600 p-1 text-xs shadow-sm"
                    id="order"
                >
                    {orderOpts.map(({ label }) => (
                        <option key={label}>{label}</option>
                    ))}
                </select>
            </div>
        </aside>
    );
}
