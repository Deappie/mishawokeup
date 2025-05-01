import './styles.css'
import Carousel from "./components/Carousel.jsx";
import collectionItems from "./data/items.js";


function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Header */}
      <header className=" w-full bg-white z-50">
        <div className="flex items-center justify-center py-4 mb-5">
          <img src="/mishawokeup/logo.png" alt="Logo" className="h-12" />
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow">
        <div className="h-full">
          <Carousel items={collectionItems} />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white">
        <div className="flex items-center justify-center py-3">
          <p className="text-sm">&copy; 2025 Mihhail Zaytsev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
