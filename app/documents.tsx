import { FileObject } from '@supabase/storage-js';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { LogoutButton } from '~/components/LogoutButton';
import { useAuth } from '~/contexts/AuthContext';
import { supabase } from '~/utils/supabase';

export default function Details() {
  const { session } = useAuth();
  const [pdfs, setPdfs] = useState<FileObject[]>([]);
  useEffect(() => {
    if (!session) return;
    loadPdfs();
  }, [session]);

  const loadPdfs = async () => {
    const { data } = await supabase.storage.from('documents').list(`${session?.user.id}`);
    if (!data) return;
    setPdfs(data);
  };

  return (
    <View className={styles.container}>
      <View className={styles.main}>
        <Text className={styles.title}>Details</Text>
        <Text>{session?.user.id}</Text>
        <Text className={styles.subtitle}>
          Showing details for user {session?.user.email?.split('@')[0]}.
        </Text>
        {pdfs.map((pdf) => (
          <Link key={pdf.id} href={`/document/${pdf.name}`}>
            {pdf.name}
          </Link>
        ))}
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
