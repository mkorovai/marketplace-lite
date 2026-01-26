// base
import { ReactNode, ReactElement } from 'react';

// components
import ParallaxScrollView from '@/components/layout/ParallaxScrollView';

type Props = {
  children: ReactNode;
  headerImage: ReactElement;
  headerBackgroundColor: {
    light: string;
    dark: string;
  };
};

export default function ParallaxScreenLayout({ children, headerImage, headerBackgroundColor }: Props) {
  return (
    <ParallaxScrollView headerImage={headerImage} headerBackgroundColor={headerBackgroundColor}>
      {children}
    </ParallaxScrollView>
  );
}
