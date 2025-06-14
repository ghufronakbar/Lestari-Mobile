import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { ColorSystem, Spacing, BorderRadius, Shadows } from '@/constants';
import { TextStyles } from '@/constants/Typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const EnhancedTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          const scale = useSharedValue(isFocused ? 1 : 0.9);
          const opacity = useSharedValue(isFocused ? 1 : 0.6);

          React.useEffect(() => {
            scale.value = withSpring(isFocused ? 1 : 0.9, { damping: 15 });
            opacity.value = withSpring(isFocused ? 1 : 0.6);
          }, [isFocused]);

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
          }));

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <AnimatedPressable
              key={route.key}
              style={[styles.tab, animatedStyle]}
              onPress={onPress}
            >
              <View style={[styles.tabContent, isFocused && styles.activeTab]}>
                {options.tabBarIcon?.({ 
                  focused: isFocused, 
                  color: isFocused ? ColorSystem.primary[500] : ColorSystem.neutral[500],
                  size: 24 
                })}
                {isFocused && (
                  <Text style={styles.tabLabel}>{label}</Text>
                )}
              </View>
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: ColorSystem.surface.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    ...Shadows.lg,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  activeTab: {
    backgroundColor: ColorSystem.primary[50],
  },
  tabLabel: {
    ...TextStyles.caption,
    color: ColorSystem.primary[500],
    fontWeight: '600',
  },
});