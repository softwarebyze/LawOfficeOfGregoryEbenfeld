import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (lastName: string, ssn: string) => object;
}) => {
  const [lastName, setLastName] = useState('');
  const [ssn, setSsn] = useState('');

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        margin: 'auto',
      }}
      className="">
      <Text className="text-4xl">Login Form</Text>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        className="text-4xl"
      />
      <TextInput value={ssn} onChangeText={setSsn} placeholder="SSN" className="text-4xl" />
      <TouchableOpacity
        onPress={() => onSubmit(lastName, ssn)}
        className="border-4 border-blue-500 p-4">
        <Text style={{ borderWidth: 3 }} className="text-4xl p-4">
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};
