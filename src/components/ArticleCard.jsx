import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/* eslint-disable react/prop-types */
export default function ArticleCard(props) {
    const { article } = props;
    return (
        <li className="border p-4 list-none rounded shadow-lg">
            <div className="flex items-center justify-between">
                <p className="text-slate-600">
                    Posted by{" "}
                    <span className="text-emerald-600 hover:underline">
                        <a href="/">{article.author}</a>
                    </span>{" "}
                    {dayjs(article.created_at).fromNow()}
                </p>
                <button className="border-emerald-400 border rounded-lg p-1 bg-emerald-300 text-xs font-bold text-emerald-800">
                    {article.topic}
                </button>
            </div>

            <a href="/">
                <h2 className="font-bold my-2 text-xl">{article.title}</h2>
            </a>

            <p className="text-slate-600">{article.comment_count} comments</p>
        </li>
    );
}
