import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  className,
  ...rest
}: ThemedTextProps & { className?: string }) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const typeClasses = {
    default: 'text-base leading-6',
    defaultSemiBold: 'text-base leading-6 font-semibold',
    title: 'text-[32px] font-bold leading-8',
    subtitle: 'text-xl font-bold',
    link: 'leading-[30px] text-base text-[#0a7ea4]',
  };

  const combinedClassName = className
    ? `${typeClasses[type]} ${className}`
    : typeClasses[type];

  return (
    <Text
      className={combinedClassName}
      style={[{ color: type === 'link' ? '#0a7ea4' : color }, style]}
      {...rest}
    />
  );
}
