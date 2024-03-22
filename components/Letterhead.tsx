import { View, Text } from 'react-native';

const Letterhead = () => {
  return (
    <View className="mt-4 p-4 gap-2">
      <Text className="text-center font-semibold text-5xl">Law Offices of</Text>
      <Text className="pt-4 text-center uppercase font-bold text-4xl">
        GREGORY A. EBENFELD, P.A.
      </Text>
    </View>
  );
};

export default Letterhead;
