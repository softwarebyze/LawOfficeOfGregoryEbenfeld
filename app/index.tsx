import { Stack } from 'expo-router';
import { View } from 'react-native';

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
    <View className={styles.container}>
      <Stack.Screen options={{ title: 'Overview' }} redirect={!!session} />
      <View className={styles.main}>
        <LoginForm onSubmit={logIn} />
      </View>
    </View>
  );
}

const styles = {
  button: 'items-center bg-indigo-500 rounded-[28px] shadow-md p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
  container: 'flex-1 p-6',
  main: 'flex-1 max-w-[960] justify-between',
  title: 'text-[64px] font-bold',
  subtitle: 'text-4xl text-gray-700',
};
