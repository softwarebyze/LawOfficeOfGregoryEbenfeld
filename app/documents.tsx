import { AntDesign } from '@expo/vector-icons';
import { FileObject } from '@supabase/storage-js';
import { Link, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, useColorScheme } from 'react-native';

import { LogoutButton } from '~/components/LogoutButton';
import { useAuth } from '~/contexts/AuthContext';
import { supabase } from '~/utils/supabase';

export default function Details() {
  const { session } = useAuth();
  const [pdfs, setPdfs] = useState<FileObject[]>([]);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

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
    <>
      <Stack.Screen options={{ title: 'Documents', headerLeft: () => <LogoutButton /> }} />

      <ScrollView className="flex-1 px-6 max-w-[960] bg-white dark:bg-slate-800">
        {pdfs.map((pdf) => (
          <Link href={`/document/${pdf.name}`} className="justify-stretch" asChild key={pdf.id}>
            <TouchableOpacity className="p-8 pl-0 border-b-2 border-b-slate-300 flex-row items-center justify-between">
              <Text className="text-3xl dark:text-slate-200">{pdf.name}</Text>
              <AntDesign name="right" size={24} color={isDarkMode ? 'white' : 'black'} />
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </>
  );
}
