import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ColorSystem, Spacing } from '@/constants';
import { TextStyles } from '@/constants/Typography';

// Accessible button with proper ARIA labels
interface AccessibleButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  accessibilityHint?: string;
  disabled?: boolean;
  style?: any;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  disabled = false,
  style,
}) => {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      {children}
    </Pressable>
  );
};

// Accessible form field with proper labeling
interface AccessibleFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}

export const AccessibleField: React.FC<AccessibleFieldProps> = ({
  label,
  children,
  error,
  required = false,
}) => {
  const fieldId = React.useId();
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <View style={styles.field}>
      <Text 
        style={styles.label}
        nativeID={`${fieldId}-label`}
        accessible={true}
        accessibilityRole="text"
      >
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      
      <View
        accessible={true}
        accessibilityLabelledBy={`${fieldId}-label`}
        accessibilityDescribedBy={errorId}
      >
        {children}
      </View>
      
      {error && (
        <Text 
          style={styles.error}
          nativeID={errorId}
          accessible={true}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

// High contrast mode support
export const useHighContrast = () => {
  // This would integrate with system accessibility settings
  const [isHighContrast, setIsHighContrast] = React.useState(false);
  
  return {
    isHighContrast,
    colors: isHighContrast ? {
      background: '#000000',
      text: '#FFFFFF',
      primary: '#FFFF00',
      border: '#FFFFFF',
    } : ColorSystem,
  };
};

const styles = StyleSheet.create({
  button: {
    minHeight: 44, // Minimum touch target size
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  field: {
    marginBottom: Spacing.md,
  },
  label: {
    ...TextStyles.bodyMedium,
    color: ColorSystem.neutral[700],
    marginBottom: Spacing.sm,
  },
  required: {
    color: ColorSystem.semantic.error.DEFAULT,
  },
  error: {
    ...TextStyles.caption,
    color: ColorSystem.semantic.error.DEFAULT,
    marginTop: Spacing.xs,
  },
});