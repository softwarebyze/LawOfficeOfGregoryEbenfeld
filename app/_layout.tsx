import { Session } from '@supabase/supabase-js';
import { Stack, router } from 'expo-router';
import { useState, useEffect } from 'react';

import { AuthContext } from '~/contexts/AuthContext';
import { supabase } from '~/utils/supabase';
import '../global.css';

export default function Layout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        router.replace('/documents');
      } else {
        console.log('no user');
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        router.replace('/documents');
      } else {
        console.log('no user');
      }
    });
  }, []);

  const logOut = async () => await supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ session, logOut }}>
      <Stack>
        <Stack.Screen name="index" redirect={!!session} />
        <Stack.Screen name="documents" redirect={!session} />
      </Stack>
    </AuthContext.Provider>
  );
}
