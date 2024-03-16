import { AuthError, Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export const AuthContext = createContext<{ session: Session | null; logOut: () => object }>({
  session: null,
  logOut: () =>
    Promise<{
      error: AuthError | null;
    }>,
});
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
