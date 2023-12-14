import { useSearchParams, Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

import Feed from "./Feed";

export default function AllArticlesPage() {
    const [search] = useSearchParams();

    const topic = search.get("topic");
    
    return (
        <>
            <section className="py-12">
                <h1 className="font-bold text-2xl text-center">
                    Articles about {topic}
                </h1>
                <Link to={"/"}>
                    <span className="flex text-emerald-500 font-bold hover:underline items-center">
                        <IoIosArrowRoundBack className="w-6 h-6" />
                        Back to All
                    </span>
                </Link>
            </section>
            <Feed />
        </>
    );
}
