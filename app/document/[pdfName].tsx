import { usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { PdfViewer } from '~/components/PdfViewer';
import { useAuth } from '~/contexts/AuthContext';
import { supabase } from '~/utils/supabase';

export default function Document() {
  const { session } = useAuth();

  const pathName = usePathname();
  const pdfName = pathName.split('/').at(-1);

  const [pdfBlobText, setPdfBlobText] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;

    loadPdf();
  }, [session]);

  const loadPdf = async () => {
    const { data } = await supabase.storage
      .from(`documents/${session?.user.id}`)
      .download('Probate.pdf');

    if (!data) return;

    const blobUrl = URL.createObjectURL(data);
    setPdfBlobText(blobUrl || null);
  };

  return (
    <>
      <Text>Document: {pdfName}</Text>
      {pdfBlobText && <PdfViewer url={pdfBlobText} />}
    </>
  );
}
