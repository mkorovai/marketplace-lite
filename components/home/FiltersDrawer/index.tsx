// base
import React, { useRef, useEffect, useCallback } from 'react';

// libs
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';

// react-native
import {
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  Animated,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import Divider from '@/components/ui/Divider';
import FilterSection from '@/components/home/FiltersDrawer/FilterSection';
import SectionTitle from '@/components/home/FiltersDrawer/SectionTitle';
import ChipButton from '@/components/home/FiltersDrawer/ChipButton';
import RatingButton from '@/components/home/FiltersDrawer/RatingButton';

// constants
import {
  SORT_OPTIONS,
  PRICE_PRESETS,
  RATING_OPTIONS,
  DEFAULT_FILTER_STATE,
} from '@/constants/filters';

// types
import type { PriceRange, FilterState, SortOption } from '@/types/filters';

// Module constants
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.85;
const SWIPE_CLOSE_THRESHOLD = DRAWER_HEIGHT * 0.25;
const SWIPE_VELOCITY_THRESHOLD = 800;

export default function FiltersDrawer(props: {
  visible: boolean;
  filters: FilterState;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  onReset: () => void;
}) {
  const { visible, filters, onClose, onApply, onReset } = props;

  // Controls vertical position: DRAWER_HEIGHT = hidden, 0 = fully open
  const translateY = useRef(new Animated.Value(DRAWER_HEIGHT)).current;

  // Controls backdrop darkness: 0 = transparent, 1 = semi-black
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Controls whether JSX is rendered at all
  const [mounted, setMounted] = React.useState(false);
  const [localFilters, setLocalFilters] = React.useState<FilterState>(filters);
  const animateCloseRef = useRef<() => void>(() => {});
  const animateSnapBackRef = useRef<() => void>(() => {});

  // Open: mount component and animate drawer up + backdrop in
  useEffect(() => {
    if (visible) {
      setLocalFilters(filters);
      setMounted(true);

      translateY.setValue(DRAWER_HEIGHT);
      backdropOpacity.setValue(0);

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 200,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, filters, translateY, backdropOpacity]);

  // Close: animate drawer down + backdrop out, then unmount and call onClose
  const animateClose = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: DRAWER_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMounted(false);
      onClose();
    });
  }, [translateY, backdropOpacity, onClose]);

  // Snap back: user didn't swipe far enough — spring back to open position
  const animateSnapBack = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, backdropOpacity]);

  // Update refs on every render so panGesture always has fresh closures
  animateCloseRef.current = animateClose;
  animateSnapBackRef.current = animateSnapBack;

  // Pan gesture on the header drag zone only
  // .runOnJS(true)     — callbacks on JS thread (required for Animated API)
  // .activeOffsetY(10) — activate only on downward movement > 10px
  // .failOffsetY(-5)   — cancel if upward movement > 5px (lets ScrollView work)
  const panGesture = useRef(
    Gesture.Pan()
      .runOnJS(true)
      .activeOffsetY(10)
      .failOffsetY(-5)
      .onUpdate((e) => {
        if (e.translationY > 0) {
          translateY.setValue(e.translationY);
          const progress = Math.min(e.translationY / SWIPE_CLOSE_THRESHOLD, 1);
          backdropOpacity.setValue(1 - progress * 0.85);
        }
      })
      .onEnd((e) => {
        const shouldClose =
          e.translationY > SWIPE_CLOSE_THRESHOLD || e.velocityY > SWIPE_VELOCITY_THRESHOLD;
        if (shouldClose) {
          animateCloseRef.current();
        } else {
          animateSnapBackRef.current();
        }
      }),
  ).current;

  const setSort = (value: SortOption) => () => {
    setLocalFilters((prevState) => ({
      ...prevState,
      sortBy: value,
    }));
  };

  const setPriceRange = (value: PriceRange) => () => {
    setLocalFilters((prevState) => ({
      ...prevState,
      priceRange: value,
    }));
  };

  const setRating = (value: number) => () => {
    setLocalFilters((prevState) => ({
      ...prevState,
      minRating: prevState.minRating === value ? null : value,
    }));
  };

  const toggleInStockOnly = () => {
    setLocalFilters((prevState) => ({
      ...prevState,
      inStockOnly: !prevState.inStockOnly,
    }));
  };

  // Save localFilters close
  const handleApply = useCallback(() => {
    onApply(localFilters);
    animateClose();
  }, [localFilters, onApply, animateClose]);

  // Reset localFilters to default, notify parent, close
  const handleReset = useCallback(() => {
    setLocalFilters(DEFAULT_FILTER_STATE);
    onReset();
    animateClose();
  }, [onReset, animateClose]);

  // Check if a price preset is currently selected
  const isPricePresetSelected = (range: PriceRange) =>
    localFilters.priceRange.min === range.min && localFilters.priceRange.max === range.max;

  // True if any filter differs from default — enables Reset button
  const hasActiveFilters =
    localFilters.sortBy !== 'default' ||
    localFilters.minRating !== null ||
    localFilters.inStockOnly ||
    localFilters.priceRange.min !== 0 ||
    localFilters.priceRange.max !== 1000;

  // Don't render anything until opened
  if (!mounted) return null;

  return (
    <GestureHandlerRootView pointerEvents="box-none">
      <Animated.View
        style={{ backgroundColor: 'rgba(0,0,0,0.4)', opacity: backdropOpacity }}
        pointerEvents="auto"
      >
        <Pressable onPress={animateClose} />
      </Animated.View>
      <Animated.View style={[styles.drawer, { transform: [{ translateY }] }]} pointerEvents="auto">
        <GestureDetector gesture={panGesture}>
          <ThemedView>
            <ThemedView style={styles.handleBarWrapper}>
              <ThemedView style={styles.handleBar} />
            </ThemedView>
            <ThemedView style={styles.titleRow}>
              <ThemedText type="defaultSemiBold">Filters</ThemedText>
            </ThemedView>
          </ThemedView>
        </GestureDetector>
        <Divider spacing={0} color="#F3F4F6" />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <FilterSection<{ value: string; label: string }>
            title="Sort By"
            data={SORT_OPTIONS}
            keyExtractor={(item) => item.value}
            renderItem={(item) => (
              <ChipButton
                label={item.label}
                selected={localFilters.sortBy === item.value}
                onPress={setSort(item.value as SortOption)}
              />
            )}
          />
          <FilterSection<{ label: string; range: { min: number; max: number } }>
            title="Price Range"
            data={PRICE_PRESETS}
            keyExtractor={(item) => item.label}
            renderItem={(item) => (
              <ChipButton
                label={item.label}
                selected={isPricePresetSelected(item.range)}
                onPress={setPriceRange(item.range)}
              />
            )}
          />
          <FilterSection<number>
            title="Minimum Rating"
            data={RATING_OPTIONS}
            keyExtractor={(item) => item}
            renderItem={(item) => (
              <RatingButton
                value={item}
                selected={localFilters.minRating === item}
                onPress={setRating(item)}
              />
            )}
          />
          <SectionTitle label="Availability" />
          <Pressable style={styles.toggleRow} onPress={toggleInStockOnly}>
            <ThemedText type="default" style={styles.toggleLabel}>
              In stock only
            </ThemedText>
            <ThemedView style={[styles.toggle, localFilters.inStockOnly && styles.toggleActive]}>
              <ThemedView
                style={[styles.toggleThumb, localFilters.inStockOnly && styles.toggleThumbActive]}
              />
            </ThemedView>
          </Pressable>
        </ScrollView>
        <Divider spacing={0} color="#F3F4F6" />
        <ThemedView style={styles.footer}>
          <Pressable
            style={[styles.footerBtn, styles.resetBtn]}
            disabled={!hasActiveFilters}
            onPress={handleReset}
          >
            <ThemedText
              type="defaultSemiBold"
              style={[styles.resetText, !hasActiveFilters && styles.disabledText]}
            >
              Reset
            </ThemedText>
          </Pressable>
          <Pressable style={[styles.footerBtn, styles.applyBtn]} onPress={handleApply}>
            <ThemedText type="defaultSemiBold" style={styles.applyText}>
              Apply Filters
            </ThemedText>
          </Pressable>
        </ThemedView>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: DRAWER_HEIGHT,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  handleBarWrapper: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: '#FFF',
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  toggleLabel: {
    color: '#374151',
  },
  toggle: {
    justifyContent: 'center',
    width: 46,
    height: 26,
    borderRadius: 13,
    paddingHorizontal: 2,
    backgroundColor: '#D1D5DB',
  },
  toggleActive: {
    backgroundColor: '#111827',
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    backgroundColor: '#FFF',
  },
  footerBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  applyBtn: {
    backgroundColor: '#111827',
  },
  resetText: {
    color: '#374151',
  },
  applyText: {
    color: '#FFF',
  },
  disabledText: {
    color: '#9CA3AF',
  },
});
