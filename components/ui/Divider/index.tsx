// react-native
import { View } from 'react-native';

export default function Divider({ spacing = 16 }: { spacing?: number }) {
  return (
    <View
      style={{
        height: 1,
        marginVertical: spacing,
        backgroundColor: '#E5E7EB',
      }}
    />
  );
}
