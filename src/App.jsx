import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";

function App() {
    return (
        <>
            <Header />
            <main className="max-w-3xl mx-auto w-full">
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/:p" element={<Feed />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
