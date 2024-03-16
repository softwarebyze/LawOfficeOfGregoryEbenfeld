import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { LogoutButton } from '~/components/LogoutButton';
import { PdfViewer } from '~/components/PdfViewer';
import { useAuth } from '~/contexts/AuthContext';
import { supabase } from '~/utils/supabase';

export default function Details() {
  const { session } = useAuth();
  const [pdfBlobText, setPdfBlobText] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    loadPdfs();
    loadPdf();
  }, [session]);

  const loadPdfs = async () => {
    const { data } = await supabase.storage.from('documents').list(`${session?.user.id}`);
    if (!data) return;
    console.log(
      'list',
      data.map((d) => d?.name)
    );
  };

  const loadPdf = async () => {
    const { data } = await supabase.storage
      .from(`documents/${session?.user.id}`)
      .download('Probate.pdf');
    // .list(session?.user.id)
    if (!data) return;
    const blobUrl = URL.createObjectURL(data);
    setPdfBlobText(blobUrl || null);
  };

  return (
    <View className={styles.container}>
      <View className={styles.main}>
        <Text className={styles.title}>Details</Text>
        <Text>{session?.user.id}</Text>
        <Text className={styles.subtitle}>
          Showing details for user {session?.user.email?.split('@')[0]}.
        </Text>
        {pdfBlobText && <PdfViewer url={pdfBlobText} />}
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
