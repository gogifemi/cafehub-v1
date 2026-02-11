import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { ReservationProvider } from './context/ReservationContext';
import { ReservationDetailsPage } from './pages/ReservationDetailsPage';
import { ReservationSummaryPage } from './pages/ReservationSummaryPage';
import { ReservationPaymentPage } from './pages/ReservationPaymentPage';
import { ReservationReceiptPage } from './pages/ReservationReceiptPage';
import { CafeDetailPage } from './pages/CafeDetailPage';

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <ReservationProvider>
        <main className="mx-auto flex max-w-6xl flex-1 flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cafe/:id" element={<CafeDetailPage />} />
            <Route path="/cafe/:id/reserve" element={<ReservationDetailsPage />} />
            <Route path="/cafe/:id/reserve/summary" element={<ReservationSummaryPage />} />
            <Route path="/cafe/:id/reserve/payment" element={<ReservationPaymentPage />} />
            <Route path="/cafe/:id/reservation/receipt" element={<ReservationReceiptPage />} />
          </Routes>
        </main>
      </ReservationProvider>
    </div>
  );
}

export default App;

