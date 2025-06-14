import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import { ColorSystem, Spacing, BorderRadius } from '@/constants';
import { TextStyles } from '@/constants/Typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface EnhancedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: any;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  style,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.98, { damping: 15 });
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(1, { damping: 15 });
    }
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    } else {
      baseStyle.push(styles[variant]);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    if (disabled || loading) {
      baseStyle.push(styles.disabledText);
    } else {
      baseStyle.push(styles[`${variant}Text`]);
    }
    
    return baseStyle;
  };

  return (
    <AnimatedPressable
      style={[getButtonStyle(), animatedStyle, style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? 'white' : ColorSystem.primary[500]} 
        />
      ) : (
        <>
          {icon}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  
  // Sizes
  small: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },
  
  // Variants
  primary: {
    backgroundColor: ColorSystem.primary[500],
  },
  secondary: {
    backgroundColor: ColorSystem.neutral[100],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: ColorSystem.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  
  // States
  disabled: {
    backgroundColor: ColorSystem.neutral[200],
    borderColor: ColorSystem.neutral[200],
  },
  
  // Text styles
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  smallText: {
    ...TextStyles.bodySmall,
  },
  mediumText: {
    ...TextStyles.body,
  },
  largeText: {
    ...TextStyles.h4,
  },
  
  // Text variants
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: ColorSystem.neutral[700],
  },
  outlineText: {
    color: ColorSystem.primary[500],
  },
  ghostText: {
    color: ColorSystem.primary[500],
  },
  disabledText: {
    color: ColorSystem.neutral[400],
  },
});