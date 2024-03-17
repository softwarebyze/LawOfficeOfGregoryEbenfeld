import * as Sharing from 'expo-sharing';
import { Share, Text, TouchableOpacity } from 'react-native';

// async function shareAsync() {
//     await Share.share(
//       {
//         message: `Check out not-crossy-road by @baconbrix`,
//         url: 'https://crossyroad.netlify.com',
//         title: 'Not Crossy Road',
//       },
//       {
//         dialogTitle: 'Share Not Crossy Road',
//         excludedActivityTypes: [
//           'com.apple.UIKit.activity.AirDrop', // This speeds up showing the share sheet by a lot
//           'com.apple.UIKit.activity.AddToReadingList', // This is just lame :)
//         ],
//         tintColor: Colors.blue,
//       },
//     );
//   }


export function ShareButton({ url }: { url: string }) {
  const handlePress = async () => {
    await Sharing.shareAsync(url);
  };

  return (
    <ShareButton url='google.com' />
    // <TouchableOpacity onPress={handlePress}>
    //   <Text>Share</Text>
    // </TouchableOpacity>
  );
}
