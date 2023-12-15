import { useContext } from "react";
import { FaCodeBranch } from "react-icons/fa6";
import { UserContext } from "../context/userContext";
import { ThemeContext } from "../context/themeContext";
import { Avatar } from "./ui/Avatar";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

export default function Header() {
    const { user } = useContext(UserContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="flex bg-background justify-between border p-4 gap-4">
            <a className="flex font-bold font-mono text-xl" href="/">
                <FaCodeBranch className="w-8 h-8 text-accent" />
                NC News
            </a>
            <button
                className="flex-grow items-center inline-flex justify-end"
                onClick={toggleTheme}
            >
                {theme === "light" ? (
                    <CiLight className="w-8 h-8" />
                ) : (
                    <CiDark className="w-8 h-8" />
                )}
            </button>

            <Avatar src={user.avatar_url} alt="" />
        </nav>
    );
}
