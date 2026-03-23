// react-native
import {
  StyleSheet,
  Pressable,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';

// zustand
import { useShallow } from 'zustand/react/shallow';

// store
import { useCartStore, CartState } from '@/store/useCartStore';

// hooks
import { getDiscountedPrice } from '@/utils/getDiscountedPrice';

// service
import { showSuccess } from '@/lib/toast/toast';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

// types
import { CartItem as Item } from '@/types/cart';

type Props = {
  data: Item;
};

const CartItem = ({ data }: Props) => {
  const { id, title, price, discountPercentage = 0, quantity } = data;

  const newPrice = getDiscountedPrice(price, discountPercentage);
  const { increment, decrement, removeItem } = useCartStore(
    useShallow((state: CartState) => ({
      increment: state.increment,
      decrement: state.decrement,
      removeItem: state.removeItem,
    })),
  );

  const handleDecrement = () => decrement(id);
  const handleIncrement = () => increment(id);
  const handleRemoveItem = () => {
    removeItem(id);
    showSuccess('Removed from cart', title);
  };

  return (
    <ThemedView style={styles.root}>
      <ThemedView style={styles.info}>
        <ThemedText numberOfLines={2} type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText type="defaultSemiBold">${newPrice}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.actions}>
        <Pressable style={styles.button} onPress={handleDecrement}>
          <ThemedText>−</ThemedText>
        </Pressable>
        <ThemedText style={styles.qty}>{quantity}</ThemedText>
        <Pressable style={styles.button} onPress={handleIncrement}>
          <ThemedText>+</ThemedText>
        </Pressable>
        <Pressable style={styles.remove} onPress={handleRemoveItem}>
          <ThemedText>Remove</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
};

export default CartItem;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
  },
  info: {
    marginBottom: 8,
  },
  title: {
    paddingBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F3F5',
  },
  qty: {
    minWidth: 24,
    textAlign: 'center',
  },
  remove: {
    marginLeft: 'auto',
  },
});
