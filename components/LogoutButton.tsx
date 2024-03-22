import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';

import { useAuth } from '~/contexts/AuthContext';

export const LogoutButton = () => {
  const { logOut } = useAuth();
  return (
    <TouchableOpacity onPress={logOut} className="justify-center items-center">
      <MaterialIcons name="logout" size={24} color="red" />
      <Text>Log Out</Text>
    </TouchableOpacity>
  );
};
