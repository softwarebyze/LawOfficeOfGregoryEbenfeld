import Pdf from 'react-native-pdf';

export const PdfViewer = ({ url }: { url: string }) => {
  return <Pdf style={{ borderWidth: 1, flex: 1 }} source={{ uri: url, cache: true }} />;
};
