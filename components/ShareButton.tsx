import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Text, TouchableOpacity } from 'react-native';

const downloadAndSharePdf = async (filename: string, remoteURL: string, blob: Blob) => {
  const fr = new FileReader();
  fr.onload = async () => {
    const fileUri = `${FileSystem.documentDirectory}/${filename}.pdf`;
    if (typeof fr.result !== 'string') throw new Error('fr.result is not a string');
    await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], {
      encoding: FileSystem.EncodingType.Base64,
    });
    Sharing.shareAsync(fileUri);
  };
  fr.readAsDataURL(blob);
};

export function ShareButton({
  filename,
  url,
  blob,
}: {
  filename: string;
  url: string;
  blob: Blob;
}) {
  const handlePress = async () => {
    try {
      downloadAndSharePdf(filename, url, blob);
    } catch (error) {
      console.error('There was an error sharing the file', error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>Share</Text>
    </TouchableOpacity>
  );
}
