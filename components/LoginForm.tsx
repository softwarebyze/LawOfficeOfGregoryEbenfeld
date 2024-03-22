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
    <View className="items-center justify-center gap-12 m-auto my-10 max-w-[960]">
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        className="text-4xl border-2 rounded-lg p-4 border-slate-600 w-3/4"
        autoComplete="username"
      />
      <TextInput
        value={ssn}
        onChangeText={setSsn}
        placeholder="SSN"
        className="text-4xl border-2 rounded-lg p-4 border-slate-600 w-3/4"
        autoComplete="password"
        secureTextEntry
      />
      <TouchableOpacity
        disabled={!lastName || !ssn}
        onPress={() => onSubmit(lastName, ssn)}
        className="p-4 border-2 rounded-lg bg-slate-700 dark:bg-slate-300">
        <Text className="text-4xl border-3 p-4 text-white">Submit</Text>
      </TouchableOpacity>
      <Text className="text-center text-slate-800 dark:text-slate-300 px-10">
        Log in with your last name and social security number to view your documents
      </Text>
    </View>
  );
};
