import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (lastName: string, ssn: string) => object;
}) => {
  const [lastName, setLastName] = useState('smith');
  const [ssn, setSsn] = useState('123456789');

  return (
    <View>
      <Text className="">Login Form</Text>
      <TextInput value={lastName} onChangeText={setLastName} placeholder="Last Name" className="" />
      <TextInput value={ssn} onChangeText={setSsn} placeholder="SSN" className="" />
      <TouchableOpacity onPress={() => onSubmit(lastName, ssn)} className="">
        <Text className="">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
