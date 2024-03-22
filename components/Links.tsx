import { openURL, canOpenURL } from 'expo-linking';
import { useEffect, useState } from 'react';
import { Button, View, ViewProps } from 'react-native';

export const Links = ({ ...props }: ViewProps) => {
  const [canOpenEmail, setCanOpenEmail] = useState(false);
  const [canOpenTelephone, setCanOpenTelephone] = useState(false);

  useEffect(() => {
    canOpenURL('mailto:attorney@superdeed.com').then(setCanOpenEmail);
    canOpenURL('tel:+19544305644').then(setCanOpenTelephone);
  }, []);

  return (
    <View {...props}>
      <Button
        onPress={() => openURL('mailto:attorney@superdeed.com')}
        title="attorney@superdeed.com"
        disabled={!canOpenEmail}
      />
      <Button
        onPress={() => openURL('tel:+119544305644')}
        title="954-430-5644"
        disabled={!canOpenTelephone}
      />
    </View>
  );
};
