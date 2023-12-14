import { TbSortDescendingNumbers } from "react-icons/tb";
import { TbSortAscendingNumbers } from "react-icons/tb";

import { useState } from "react";

const sortByOpts = [
    {
        label: "Date",
        val: "created_at",
    },
    {
        label: "Comments",
        val: "comments",
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
    const [sortState, setSortState] = useState({
        sortBy: "Sort By",
        order: "DESC",
    });

    return (
        <aside className="py-4 flex items-center gap-4">
            <select
                value={sortState.sortBy}
                onChange={(e) =>
                    setSortState((curr) => ({
                        ...curr,
                        sortBy: e.target.value,
                    }))
                }
                name="sortBy"
                id="sortBy"
            >
                <option disabled selected value="Sort By">
                    Sort By
                </option>
                {sortByOpts.map(({ label, val }) => (
                    <option key={val}>{label}</option>
                ))}
            </select>
            <select
                value={sortState.order}
                onChange={(e) =>
                    setSortState((curr) => ({
                        ...curr,
                        order: e.target.value,
                    }))
                }
                name="sortBy"
                id="sortBy"
            >
                {orderOpts.map(({ label }) => (
                    <option key={label}>{label}</option>
                ))}
            </select>
        </aside>
    );
}
