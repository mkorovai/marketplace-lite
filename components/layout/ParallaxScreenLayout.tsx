// base
import { ReactNode, ReactElement } from 'react';

// components
import ParallaxScrollView from '@/components/parallax-scroll-view';

type Props = {
  children: ReactNode;
  headerImage: ReactElement;
  headerBackgroundColor: {
    light: string;
    dark: string;
  };
};

export function ParallaxScreenLayout({ children, headerImage, headerBackgroundColor }: Props) {
  return (
    <ParallaxScrollView headerImage={headerImage} headerBackgroundColor={headerBackgroundColor}>
      {children}
    </ParallaxScrollView>
  );
}
