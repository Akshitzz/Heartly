import { Text } from 'react-native';

// Try to use reanimated if available
let Animated: any;
let isReanimatedAvailable = false;

try {
  const reanimated = require('react-native-reanimated');
  Animated = reanimated.default;
  isReanimatedAvailable = true;
} catch {
  // Reanimated not available (Expo Go)
  isReanimatedAvailable = false;
}

export function HelloWave() {
  if (isReanimatedAvailable && Animated) {
    return (
      <Animated.Text
        className="text-[28px] leading-8 -mt-1.5"
        style={{
          animationName: {
            '50%': { transform: [{ rotate: '25deg' }] },
          },
          animationIterationCount: 4,
          animationDuration: '300ms',
        }}>
        👋
      </Animated.Text>
    );
  }

  // Fallback for Expo Go - static emoji
  return (
    <Text className="text-[28px] leading-8 -mt-1.5">
      👋
    </Text>
  );
}
