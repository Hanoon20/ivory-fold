import { createContext, useContext, useMemo } from 'react';
import { getWedding } from '../config/weddings';
import { readGuestName } from '../utils/guest';

const WeddingContext = createContext(null);

export function WeddingProvider({ slug, children }) {
  const value = useMemo(() => {
    const config = getWedding(slug);
    return { ...config, guest: readGuestName() };
  }, [slug]);

  return <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>;
}

export function useWedding() {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error('useWedding must be used inside a WeddingProvider');
  return ctx;
}
