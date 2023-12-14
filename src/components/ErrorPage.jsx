import { useParams, useSearchParams, Link } from "react-router-dom";
import { BiError } from "react-icons/bi";

export default function ErrorPage() {
    const params = useParams();
    const [search] = useSearchParams();
    const msg = search.get("msg");
    console.log(params, msg);
    return (
        <div className="min-h-[60dvh] flex flex-col items-center justify-center text-orange-600">
            <BiError className="w-20 h-20" />
            <h1 className="font-bold text-3xl">
                Error: {params.code ?? "404"}
            </h1>
            <h2 className="text-2xl">{msg ?? "Page not found"}</h2>
            <Link
                className="text-lg text-emerald-600 font-bold hover:underline"
                to={"/"}
            >
                Go Back
            </Link>
            <img
                className="w-96"
                src="https://images.pexels.com/photos/127027/pexels-photo-127027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
        </div>
    );
}
