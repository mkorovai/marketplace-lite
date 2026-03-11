// react-native
import { View } from 'react-native';

// types
type Props = {
  spacing?: number;
  color?: string;
};

export default function Divider({ spacing = 16, color = '#E5E7EB' }: Props) {
  return (
    <View
      style={{
        height: 1,
        marginVertical: spacing,
        backgroundColor: color,
      }}
    />
  );
}
