import Header from "./components/header";
import Feed from "./components/Feed";

function App() {
    return (
        <>
            <Header />
            <main className="max-w-3xl mx-auto w-full">
                <Feed />
            </main>
        </>
    );
}

export default App;
