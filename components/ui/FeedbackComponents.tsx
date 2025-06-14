import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react-native';
import { ColorSystem, Spacing, BorderRadius, Shadows } from '@/constants';
import { TextStyles } from '@/constants/Typography';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  visible,
  onHide,
  duration = 4000,
}) => {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 15 });
      opacity.value = withTiming(1, { duration: 300 });
      
      const timer = setTimeout(() => {
        translateY.value = withSpring(-100, { damping: 15 });
        opacity.value = withTiming(0, { duration: 300 }, () => {
          runOnJS(onHide)();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getIcon = () => {
    const iconProps = { size: 20, color: 'white' };
    switch (type) {
      case 'success': return <CheckCircle {...iconProps} />;
      case 'error': return <XCircle {...iconProps} />;
      case 'warning': return <AlertCircle {...iconProps} />;
      case 'info': return <Info {...iconProps} />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return ColorSystem.semantic.success.DEFAULT;
      case 'error': return ColorSystem.semantic.error.DEFAULT;
      case 'warning': return ColorSystem.semantic.warning.DEFAULT;
      case 'info': return ColorSystem.semantic.info.DEFAULT;
    }
  };

  if (!visible) return null;

  return (
    <Animated.View 
      style={[
        styles.toast,
        { backgroundColor: getBackgroundColor() },
        animatedStyle
      ]}
    >
      {getIcon()}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </Animated.View>
  );
};

// Empty state component
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withSpring(1, { damping: 15 });
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.emptyState, animatedStyle]}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      {description && (
        <Text style={styles.emptyDescription}>{description}</Text>
      )}
      {action && (
        <View style={styles.emptyAction}>
          {action}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 60,
    left: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Shadows.lg,
    zIndex: 1000,
  },
  textContainer: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  title: {
    ...TextStyles.bodyMedium,
    color: 'white',
  },
  message: {
    ...TextStyles.bodySmall,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: Spacing.xs,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.lg,
    opacity: 0.6,
  },
  emptyTitle: {
    ...TextStyles.h3,
    color: ColorSystem.neutral[700],
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  emptyDescription: {
    ...TextStyles.body,
    color: ColorSystem.neutral[500],
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  emptyAction: {
    marginTop: Spacing.md,
  },
});