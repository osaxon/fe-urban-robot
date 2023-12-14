import { useParams, useSearchParams, Link } from "react-router-dom";
import { BiError } from "react-icons/bi";

export default function ErrorPage() {
    const params = useParams();
    const [search] = useSearchParams();
    const msg = search.get("msg");
    console.log(params, msg);
    return (
        <div className="h-[60dvh] flex flex-col items-center justify-center text-orange-600">
            <BiError className="w-20 h-20" />
            <h1 className="font-bold text-3xl">Error: {params.code}</h1>
            <h2 className="text-2xl">{msg}</h2>
            <img
                className="w-80"
                src="https://images.pexels.com/photos/159868/lost-cat-tree-sign-fun-159868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <Link
                className="text-lg text-emerald-600 font-bold hover:underline"
                to={"/"}
            >
                Go Back
            </Link>
        </div>
    );
}
