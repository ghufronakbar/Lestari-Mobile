import React from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ColorSystem, Spacing } from '@/constants';

interface FormProps {
  children: React.ReactNode;
  onSubmit?: () => void;
  style?: any;
}

export const EnhancedForm: React.FC<FormProps> = ({
  children,
  onSubmit,
  style,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          style={[styles.scrollView, style]}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Form section with visual grouping
interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <View style={styles.section}>
      {title && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {description && (
            <Text style={styles.sectionDescription}>{description}</Text>
          )}
        </View>
      )}
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );
};

// Progress indicator for multi-step forms
interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export const FormProgress: React.FC<FormProgressProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
}) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { width: `${(currentStep / totalSteps) * 100}%` }
          ]} 
        />
      </View>
      
      {stepLabels && (
        <View style={styles.stepLabels}>
          {stepLabels.map((label, index) => (
            <Text
              key={index}
              style={[
                styles.stepLabel,
                index < currentStep && styles.completedStepLabel,
                index === currentStep && styles.currentStepLabel,
              ]}
            >
              {label}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorSystem.surface.secondary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxxl,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...TextStyles.h3,
    color: ColorSystem.neutral[900],
    marginBottom: Spacing.xs,
  },
  sectionDescription: {
    ...TextStyles.body,
    color: ColorSystem.neutral[600],
  },
  sectionContent: {
    backgroundColor: ColorSystem.surface.primary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  progressContainer: {
    marginBottom: Spacing.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: ColorSystem.neutral[200],
    borderRadius: BorderRadius.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: ColorSystem.primary[500],
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  stepLabel: {
    ...TextStyles.caption,
    color: ColorSystem.neutral[500],
  },
  completedStepLabel: {
    color: ColorSystem.primary[500],
    fontWeight: '600',
  },
  currentStepLabel: {
    color: ColorSystem.neutral[900],
    fontWeight: '600',
  },
});