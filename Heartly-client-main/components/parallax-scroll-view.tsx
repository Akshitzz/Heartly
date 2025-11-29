import type { PropsWithChildren, ReactElement } from 'react';
import { ScrollView, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

// Try to use reanimated if available, otherwise fallback to regular components
let Animated: any;
let useAnimatedRef: any;
let useScrollViewOffset: any;
let useAnimatedStyle: any;
let interpolate: any;
let isReanimatedAvailable = false;

try {
  const reanimated = require('react-native-reanimated');
  Animated = reanimated.default;
  useAnimatedRef = reanimated.useAnimatedRef;
  useScrollViewOffset = reanimated.useScrollViewOffset;
  useAnimatedStyle = reanimated.useAnimatedStyle;
  interpolate = reanimated.interpolate;
  isReanimatedAvailable = true;
} catch {
  // Reanimated not available (Expo Go)
  isReanimatedAvailable = false;
}

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';

  if (isReanimatedAvailable && Animated && useAnimatedRef && useScrollViewOffset && useAnimatedStyle && interpolate) {
    // Use reanimated version
    const scrollRef = useAnimatedRef();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const headerAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              scrollOffset.value,
              [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
              [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
            ),
          },
          {
            scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
          },
        ],
      };
    });

    return (
      <Animated.ScrollView
        ref={scrollRef}
        className="flex-1"
        style={{ backgroundColor }}
        scrollEventThrottle={16}>
        <Animated.View
          className="h-[250px] overflow-hidden"
          style={[
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>
        <ThemedView className="flex-1 p-8 gap-4 overflow-hidden">{children}</ThemedView>
      </Animated.ScrollView>
    );
  }

  // Fallback for Expo Go - simple scroll view without animations
  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor }}
      scrollEventThrottle={16}>
      <View
        className="h-[250px] overflow-hidden"
        style={{ backgroundColor: headerBackgroundColor[colorScheme] }}>
        {headerImage}
      </View>
      <ThemedView className="flex-1 p-8 gap-4 overflow-hidden">{children}</ThemedView>
    </ScrollView>
  );
}
