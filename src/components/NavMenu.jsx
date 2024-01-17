import { useQuery } from "@tanstack/react-query";
import { getTopics } from "../lib/api";
import { Spinner } from "./ui/Spinner";

export default function NavMenu() {
    const { data, isLoading } = useQuery({
        queryKey: ["topics"],
        queryFn: getTopics,
    });
    return isLoading ? (
        <Spinner />
    ) : (
        <nav className="w-full content-grid py-4 bg-secondary text-accent dark:text-teal-950 flex items-center justify-center">
            <ul className="space-x-4">
                <li className="inline-block">
                    <a className="hover:underline" href="">
                        all
                    </a>
                </li>
                {data &&
                    data.topics.map((topic) => (
                        <li key={topic.slug} className="inline-block">
                            <a className="hover:underline" href="">
                                {topic.slug}
                            </a>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}
