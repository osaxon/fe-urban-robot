/* eslint-disable react/prop-types */
import { TbSortDescendingNumbers } from "react-icons/tb";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";

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

export default function SortAndFilter({ sortState, setSortState }) {
    return (
        <aside className="flex items-center gap-4">
            <div className="flex flex-col">
                <label
                    className="text-slate-600 text-sm flex items-center"
                    htmlFor="sortBy"
                >
                    <MdOutlineCategory />
                    Sort By
                </label>
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
                    className="border rounded p-1 text-xs shadow-sm"
                >
                    {sortByOpts.map(({ label, val }) => (
                        <option value={val} key={val}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label
                    className="text-slate-600 text-sm flex items-center"
                    htmlFor="sortBy"
                >
                    {sortState.order === "DESC" ? (
                        <TbSortDescendingNumbers />
                    ) : (
                        <TbSortAscendingNumbers />
                    )}
                    Order
                </label>
                <select
                    value={sortState.order}
                    onChange={(e) =>
                        setSortState((curr) => ({
                            ...curr,
                            order: e.target.value,
                        }))
                    }
                    name="sortBy"
                    className="border rounded p-1 text-xs shadow-sm"
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
