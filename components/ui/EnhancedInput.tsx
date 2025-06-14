import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { ColorSystem, Spacing, BorderRadius } from '@/constants';
import { TextStyles } from '@/constants/Typography';

interface EnhancedInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  keyboardType?: any;
  error?: string;
  helper?: string;
  required?: boolean;
  disabled?: boolean;
}

export const EnhancedInput: React.FC<EnhancedInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  error,
  helper,
  required = false,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureVisible, setIsSecureVisible] = useState(false);
  
  const focusAnimation = useSharedValue(0);
  const errorAnimation = useSharedValue(0);

  React.useEffect(() => {
    focusAnimation.value = withTiming(isFocused ? 1 : 0, { duration: 200 });
  }, [isFocused]);

  React.useEffect(() => {
    errorAnimation.value = withTiming(error ? 1 : 0, { duration: 200 });
  }, [error]);

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      errorAnimation.value,
      [0, 1],
      [
        interpolateColor(
          focusAnimation.value,
          [0, 1],
          [ColorSystem.neutral[300], ColorSystem.primary[500]]
        ),
        ColorSystem.semantic.error.DEFAULT
      ]
    ),
    borderWidth: interpolateColor(
      focusAnimation.value,
      [0, 1],
      [1, 2]
    ),
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      errorAnimation.value,
      [0, 1],
      [
        interpolateColor(
          focusAnimation.value,
          [0, 1],
          [ColorSystem.neutral[600], ColorSystem.primary[500]]
        ),
        ColorSystem.semantic.error.DEFAULT
      ]
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, animatedLabelStyle]}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Animated.Text>
      
      <View style={styles.inputContainer}>
        <Animated.View style={[styles.inputWrapper, animatedBorderStyle]}>
          <TextInput
            style={[
              styles.input,
              multiline && styles.multilineInput,
              disabled && styles.disabledInput,
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={ColorSystem.neutral[400]}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines}
            secureTextEntry={secureTextEntry && !isSecureVisible}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            editable={!disabled}
          />
          
          {secureTextEntry && (
            <Pressable
              style={styles.eyeButton}
              onPress={() => setIsSecureVisible(!isSecureVisible)}
            >
              {isSecureVisible ? (
                <EyeOff size={20} color={ColorSystem.neutral[500]} />
              ) : (
                <Eye size={20} color={ColorSystem.neutral[500]} />
              )}
            </Pressable>
          )}
        </Animated.View>
      </View>
      
      {(error || helper) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helper}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...TextStyles.bodySmall,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  required: {
    color: ColorSystem.semantic.error.DEFAULT,
  },
  inputContainer: {
    position: 'relative',
  },
  inputWrapper: {
    backgroundColor: ColorSystem.surface.primary,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    ...TextStyles.body,
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    minHeight: 48,
    color: ColorSystem.neutral[900],
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  disabledInput: {
    backgroundColor: ColorSystem.neutral[50],
    color: ColorSystem.neutral[400],
  },
  eyeButton: {
    padding: Spacing.md,
  },
  helperText: {
    ...TextStyles.caption,
    color: ColorSystem.neutral[600],
    marginTop: Spacing.xs,
  },
  errorText: {
    color: ColorSystem.semantic.error.DEFAULT,
  },
});