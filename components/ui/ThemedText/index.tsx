// react-native
import { StyleSheet, type TextProps, type StyleProp, type TextStyle, Text } from 'react-native';

// hooks
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | 'xs'
    | 'xsSemiBold'
    | 'sm'
    | 'smSemiBold'
    | 'default'
    | 'defaultSemiBold'
    | 'md'
    | 'mdSemiBold'
    | 'lg'
    | 'lgSemiBold'
    | 'title'
    | 'link';
};

export default function ThemedText(props: ThemedTextProps) {
  const { type = 'default', lightColor, darkColor, style, ...rest } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const computedStyle: StyleProp<TextStyle> = [styles[type], { color }, style];

  return <Text style={computedStyle} {...rest} />;
}

const styles = StyleSheet.create({
  // 12px
  xs: {
    fontSize: 12,
    lineHeight: 18,
  },
  xsSemiBold: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  // 14px
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  smSemiBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  // 16px
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  md: {
    fontSize: 18,
    lineHeight: 26,
  },
  mdSemiBold: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },
  // 20px
  lg: {
    fontSize: 20,
    lineHeight: 28,
  },
  lgSemiBold: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  // 32px
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    fontWeight: '500',
    color: '#0a7ea4',
  },
});
