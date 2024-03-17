import { usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { PdfViewer } from '~/components/PdfViewer';
import { ShareButton } from '~/components/ShareButton';
import { useAuth } from '~/contexts/AuthContext';
import { supabase } from '~/utils/supabase';

export default function Document() {
  const { session } = useAuth();

  const pathName = usePathname();
  const pdfName = pathName.split('/').at(-1);

  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (!session) return;

    loadPdf();
  }, [session, pdfName]);

  const loadPdf = async () => {
    if (!pdfName) return;
    const { data } = await supabase.storage.from(`documents/${session?.user.id}`).download(pdfName);

    if (!data) return;
    setPdfBlob(data);

    const blobUrl = URL.createObjectURL(data);
    console.log(blobUrl);
    setPdfBlobUrl(blobUrl || null);
  };

  return (
    <>
      {pdfName && pdfBlobUrl && pdfBlob && <ShareButton blob={pdfBlob} filename={pdfName} />}

      <Text>Document: {pdfName}</Text>
      {pdfBlobUrl && <PdfViewer url={pdfBlobUrl} />}
    </>
  );
}
