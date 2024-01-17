import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import ArticlePage from "./components/ArticlePage";
import { Toaster } from "react-hot-toast";
import { ThemeContextProvider } from "./context/themeContext";
import { UserContextProvider } from "./context/userContext";
import HomePage from "./components/HomePage";
import AllArticlesPage from "./components/AllArticlesPage";
import ErrorPage from "./components/ErrorPage";
import ArticlesGrid from "./components/ArticlesGrid";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
                <UserContextProvider>
                    <Toaster />
                    <Header />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/articles/:id" element={<ArticlePage />} />
                        <Route path="/articles" element={<AllArticlesPage />} />
                        <Route
                            path="/topics/:topic/articles"
                            element={<ArticlesGrid />}
                        />
                        <Route path="/error/:code" element={<ErrorPage />} />
                        <Route path="/*" element={<ErrorPage />} />
                    </Routes>
                </UserContextProvider>
            </ThemeContextProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
