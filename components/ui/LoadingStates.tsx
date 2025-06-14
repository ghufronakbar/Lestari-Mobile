import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
} from 'react-native-reanimated';
import { ColorSystem, Spacing, BorderRadius } from '@/constants';

// Skeleton loader for cards
export const CardSkeleton: React.FC = () => {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.cardSkeleton}>
      <Animated.View style={[styles.imageSkeleton, animatedStyle]} />
      <View style={styles.contentSkeleton}>
        <Animated.View style={[styles.titleSkeleton, animatedStyle]} />
        <Animated.View style={[styles.subtitleSkeleton, animatedStyle]} />
        <Animated.View style={[styles.metaSkeleton, animatedStyle]} />
      </View>
    </View>
  );
};

// Shimmer effect for list items
export const ListItemSkeleton: React.FC = () => {
  const translateX = useSharedValue(-200);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(200, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.listItemSkeleton}>
      <View style={styles.shimmerContainer}>
        <Animated.View style={[styles.shimmer, shimmerStyle]} />
      </View>
      <View style={styles.listContentSkeleton}>
        <View style={styles.listTitleSkeleton} />
        <View style={styles.listSubtitleSkeleton} />
      </View>
    </View>
  );
};

// Pulse animation for buttons
export const ButtonSkeleton: React.FC<{ width?: number }> = ({ width = 120 }) => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View 
      style={[
        styles.buttonSkeleton, 
        { width },
        animatedStyle
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  cardSkeleton: {
    backgroundColor: ColorSystem.surface.primary,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  imageSkeleton: {
    height: 140,
    backgroundColor: ColorSystem.neutral[200],
  },
  contentSkeleton: {
    padding: Spacing.md,
  },
  titleSkeleton: {
    height: 20,
    backgroundColor: ColorSystem.neutral[200],
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.sm,
    width: '80%',
  },
  subtitleSkeleton: {
    height: 16,
    backgroundColor: ColorSystem.neutral[200],
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.sm,
    width: '60%',
  },
  metaSkeleton: {
    height: 14,
    backgroundColor: ColorSystem.neutral[200],
    borderRadius: BorderRadius.xs,
    width: '40%',
  },
  listItemSkeleton: {
    flexDirection: 'row',
    padding: Spacing.md,
    backgroundColor: ColorSystem.surface.primary,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  shimmerContainer: {
    width: 60,
    height: 60,
    backgroundColor: ColorSystem.neutral[200],
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  listContentSkeleton: {
    flex: 1,
    justifyContent: 'center',
  },
  listTitleSkeleton: {
    height: 18,
    backgroundColor: ColorSystem.neutral[200],
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.sm,
    width: '70%',
  },
  listSubtitleSkeleton: {
    height: 14,
    backgroundColor: ColorSystem.neutral[200],
    borderRadius: BorderRadius.xs,
    width: '50%',
  },
  buttonSkeleton: {
    height: 48,
    backgroundColor: ColorSystem.neutral[200],
    borderRadius: BorderRadius.md,
  },
});