import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function BackToAll() {
    return (
        <Link className="breakout py-2" to={"/"}>
            <span className="flex text-emerald-500 font-bold hover:underline items-center">
                <IoIosArrowRoundBack className="w-6 h-6" />
                Back to All
            </span>
        </Link>
    );
}
