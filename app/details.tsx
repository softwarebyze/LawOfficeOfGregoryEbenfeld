import { Text, View } from 'react-native';

import { LogoutButton } from '~/components/LogoutButton';
import { useAuth } from '~/contexts/AuthContext';

export default function Details() {
  const { session } = useAuth();

  return (
    <View className={styles.container}>
      <View className={styles.main}>
        <Text className={styles.title}>Details</Text>
        <Text className={styles.subtitle}>
          Showing details for user {session?.user.email?.split('@')[0]}.
        </Text>
        <LogoutButton />
      </View>
    </View>
  );
}

const styles = {
  backButton: 'flex-row',
  backButtonText: 'text-blue-500 ml-1',
  container: 'flex-1 p-6',
  main: 'flex-1 max-w-[960]',
  title: 'text-[64px] font-bold',
  subtitle: 'text-4xl text-gray-700',
};
