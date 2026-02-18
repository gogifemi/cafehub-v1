import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { ReservationProvider } from './context/ReservationContext';
import { ReservationDetailsPage } from './pages/ReservationDetailsPage';
import { ReservationSummaryPage } from './pages/ReservationSummaryPage';
import { ReservationPaymentPage } from './pages/ReservationPaymentPage';
import { ReservationReceiptPage } from './pages/ReservationReceiptPage';
import { CafeDetailPage } from './pages/CafeDetailPage';
import { QRScanPage } from './pages/QRScanPage';
import { QRApprovalPage } from './pages/QRApprovalPage';
import { CafeMenuPage } from './pages/CafeMenuPage';
import { OrderProvider } from './context/OrderContext';
import { OrderSummaryPage } from './pages/OrderSummaryPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { OrderPaymentPage } from './pages/OrderPaymentPage';
import { OrderReceiptPage } from './pages/OrderReceiptPage';
import { BillPage } from './pages/BillPage';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AccountPage } from './pages/AccountPage';

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <AuthProvider>
        <Navbar />
        <ReservationProvider>
          <OrderProvider>
            <main className="mx-auto flex max-w-6xl flex-1 flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/cafe/:id" element={<CafeDetailPage />} />
                <Route path="/cafe/:id/scan" element={<QRScanPage />} />
                <Route path="/cafe/:id/scan/approval" element={<QRApprovalPage />} />
                <Route path="/cafe/:id/menu" element={<CafeMenuPage />} />
                <Route path="/cafe/:id/order/summary" element={<OrderSummaryPage />} />
                <Route path="/cafe/:id/order/tracking" element={<OrderTrackingPage />} />
                <Route path="/cafe/:id/order/payment" element={<OrderPaymentPage />} />
                <Route path="/cafe/:id/order/receipt" element={<OrderReceiptPage />} />
                <Route path="/cafe/:id/bill" element={<BillPage />} />
                <Route path="/cafe/:id/reserve" element={<ReservationDetailsPage />} />
                <Route path="/cafe/:id/reserve/summary" element={<ReservationSummaryPage />} />
                <Route path="/cafe/:id/reserve/payment" element={<ReservationPaymentPage />} />
                <Route path="/cafe/:id/reservation/receipt" element={<ReservationReceiptPage />} />
              </Routes>
            </main>
          </OrderProvider>
        </ReservationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

