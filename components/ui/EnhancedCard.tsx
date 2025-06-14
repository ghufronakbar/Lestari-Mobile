import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import { Animal } from '@/models/Animal';
import { ColorSystem, Spacing, BorderRadius, Shadows } from '@/constants';
import { TextStyles } from '@/constants/Typography';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface EnhancedCardProps {
  item: Animal;
  style?: any;
  onPress?: () => void;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({ 
  item, 
  style,
  onPress 
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15 });
    opacity.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    opacity.value = withSpring(1);
  };

  const handlePress = () => {
    onPress?.() || router.push({
      pathname: "/animal/[id]",
      params: { id: item.animalId },
    });
  };

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle, style]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.imageOverlay} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.localName} numberOfLines={1}>
          {item.localName}
        </Text>
        <Text style={styles.latinName} numberOfLines={1}>
          {item.latinName}
        </Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={12} color={ColorSystem.neutral[500]} />
          <Text style={styles.location} numberOfLines={1}>
            {item.city}
          </Text>
        </View>
        
        <View style={styles.metaContainer}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{item.amount} ekor</Text>
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorSystem.surface.primary,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.md,
    marginBottom: Spacing.sm,
  },
  imageContainer: {
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.1))',
  },
  content: {
    padding: Spacing.md,
  },
  localName: {
    ...TextStyles.h4,
    color: ColorSystem.neutral[900],
    marginBottom: Spacing.xs,
  },
  latinName: {
    ...TextStyles.bodySmall,
    color: ColorSystem.neutral[600],
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  location: {
    ...TextStyles.caption,
    color: ColorSystem.neutral[600],
    marginLeft: Spacing.xs,
    flex: 1,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countBadge: {
    backgroundColor: ColorSystem.primary[50],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  countText: {
    ...TextStyles.caption,
    color: ColorSystem.primary[700],
    fontWeight: '600',
  },
});