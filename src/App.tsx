import Hero from "./components/Hero";

function App() {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Hero />
            <div className=" relative min-h-screen bg-violet-300 z-0" />
        </main>
    );
}

export default App;
