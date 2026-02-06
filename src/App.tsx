import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-1 flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Future routes will go here, e.g. /cafe/:id, /map, /favorites */}
        </Routes>
      </main>
    </div>
  );
}

export default App;

