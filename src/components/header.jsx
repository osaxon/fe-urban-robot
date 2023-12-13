import { useContext } from "react";
import { FaCodeBranch } from "react-icons/fa6";
import { UserContext } from "../context/userContext";
import { Avatar } from "./ui/Avatar";

export default function Header() {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <nav className="flex justify-between border p-4">
            <a className="flex items-end font-bold font-mono text-xl" href="/">
                <FaCodeBranch className="w-8 h-8 text-emerald-600" />
                NC News
            </a>

            <Avatar src={user.avatar_url} alt="" />
        </nav>
    );
}
