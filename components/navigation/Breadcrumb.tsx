import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { ColorSystem, Spacing } from '@/constants';
import { TextStyles } from '@/constants/Typography';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight 
              size={16} 
              color={ColorSystem.neutral[400]} 
              style={styles.separator}
            />
          )}
          <Pressable
            onPress={() => item.path && router.push(item.path)}
            disabled={!item.path || index === items.length - 1}
          >
            <Text 
              style={[
                styles.item,
                index === items.length - 1 && styles.currentItem,
                !item.path && styles.disabledItem,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: ColorSystem.surface.secondary,
  },
  item: {
    ...TextStyles.bodySmall,
    color: ColorSystem.primary[500],
  },
  currentItem: {
    color: ColorSystem.neutral[700],
    fontWeight: '600',
  },
  disabledItem: {
    color: ColorSystem.neutral[500],
  },
  separator: {
    marginHorizontal: Spacing.sm,
  },
});