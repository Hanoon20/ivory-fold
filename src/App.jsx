import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { WeddingProvider } from './context/WeddingContext';
import { DEFAULT_WEDDING, weddings } from './config/weddings';
import InvitationPage from './InvitationPage';

function WeddingRoute() {
  const { slug } = useParams();
  if (!weddings[slug]) return <Navigate to={`/wedding/${DEFAULT_WEDDING}`} replace />;
  return (
    <WeddingProvider slug={slug}>
      <InvitationPage />
    </WeddingProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/wedding/${DEFAULT_WEDDING}`} replace />} />
        <Route path="/wedding/:slug" element={<WeddingRoute />} />
        <Route path="*" element={<Navigate to={`/wedding/${DEFAULT_WEDDING}`} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
