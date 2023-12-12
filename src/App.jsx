import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import ArticlePage from "./components/ArticlePage";
import { UserContextProvider } from "./context/userContext";

function App() {
    return (
        <UserContextProvider>
            <Header />
            <main className="max-w-3xl mx-auto w-full p-4">
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/articles/:id" element={<ArticlePage />} />
                </Routes>
            </main>
        </UserContextProvider>
    );
}

export default App;
