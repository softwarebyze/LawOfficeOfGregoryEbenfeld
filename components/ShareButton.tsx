import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Text, TouchableOpacity } from 'react-native';

const downloadAndSharePdf = async (filename: string, blob: Blob) => {
  // https://stackoverflow.com/a/60444308
  const fr = new FileReader();
  fr.onload = async () => {
    const fileUri = `${FileSystem.documentDirectory}/${filename}`;
    if (typeof fr.result !== 'string') throw new Error('fr.result is not a string');
    await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], {
      encoding: FileSystem.EncodingType.Base64,
    });
    Sharing.shareAsync(fileUri);
  };
  fr.readAsDataURL(blob);
};

export function ShareButton({ filename, blob }: { filename: string; blob: Blob }) {
  const handlePress = async () => {
    try {
      downloadAndSharePdf(filename, blob);
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
