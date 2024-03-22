import { Stack } from 'expo-router';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';

import Letterhead from '~/components/Letterhead';
import { Links } from '~/components/Links';
import { LoginForm } from '~/components/LoginForm';
import { useAuth } from '~/contexts/AuthContext';
import { supabase } from '~/utils/supabase';

export default function Page() {
  const logIn = async (lastName: string, ssn: string) =>
    await supabase.auth.signInWithPassword({
      email: `${lastName.trim()}@superdeed.com`,
      password: ssn,
    });

  const { session } = useAuth();

  return (
    <>
      <Stack.Screen options={{ title: 'Login', headerShown: false }} redirect={!!session} />
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-800 items-center">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            keyboardShouldPersistTaps="handled" // https://stackoverflow.com/a/52929552
            alwaysBounceVertical={false}
            className="relative">
            <Letterhead />
            <LoginForm onSubmit={logIn} />
          </ScrollView>
        </KeyboardAvoidingView>
        <Links className="absolute bottom-10 mx-auto" />
      </SafeAreaView>
    </>
  );
}
