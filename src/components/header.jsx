import { FaCodeBranch } from "react-icons/fa6";

export default function Header() {
    return (
        <nav className="flex justify-between border p-4">
            <a className="flex items-end font-bold font-mono text-xl" href="/">
                <FaCodeBranch className="w-8 h-8 text-emerald-600" />
                NC News
            </a>
            <a href="/">Profile</a>
        </nav>
    );
}
