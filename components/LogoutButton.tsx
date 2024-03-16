import { Text, TouchableOpacity } from 'react-native';

import { useAuth } from '~/contexts/AuthContext';

export const LogoutButton = () => {
  const { logOut } = useAuth();
  return (
    <TouchableOpacity onPress={logOut} className="">
      <Text className="">Logout</Text>
    </TouchableOpacity>
  );
};
