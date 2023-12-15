import { useContext } from "react";
import { FaCodeBranch } from "react-icons/fa6";
import { UserContext } from "../context/userContext";
import { ThemeContext } from "../context/themeContext";
import { Avatar } from "./ui/Avatar";

export default function Header() {
    const { user } = useContext(UserContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    console.log(theme);

    return (
        <nav className="flex justify-between border p-4">
            <a className="flex items-end font-bold font-mono text-xl" href="/">
                <FaCodeBranch className="w-8 h-8 text-emerald-600" />
                NC News
            </a>
            <button onClick={toggleTheme}>Click</button>

            <Avatar src={user.avatar_url} alt="" />
        </nav>
    );
}
