// react-native
import { View } from 'react-native';

// types
type Props = {
  spacing?: number;
  color?: string;
};

const Divider = ({ spacing = 16, color = '#E5E7EB' }: Props) => {
  return (
    <View
      style={{
        height: 1,
        marginVertical: spacing,
        backgroundColor: color,
      }}
    />
  );
};

export default Divider;
