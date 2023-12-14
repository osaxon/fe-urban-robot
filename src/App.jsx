import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import ArticlePage from "./components/ArticlePage";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
import HomePage from "./components/HomePage";
import AllArticlesPage from "./components/AllArticlesPage";
import ErrorPage from "./components/ErrorPage";

function App() {
    return (
        <UserContextProvider>
            <Toaster />
            <Header />
            <main className="max-w-3xl mx-auto w-full p-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/articles/:id" element={<ArticlePage />} />
                    <Route path="/articles" element={<AllArticlesPage />} />
                    <Route path="/error/:code" element={<ErrorPage />} />
                </Routes>
            </main>
        </UserContextProvider>
    );
}

export default App;
