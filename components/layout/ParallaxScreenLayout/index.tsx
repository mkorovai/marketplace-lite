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

const ParallaxScreenLayout = (props: Props) => {
  const { children, headerImage, headerBackgroundColor } = props;

  return (
    <ParallaxScrollView headerImage={headerImage} headerBackgroundColor={headerBackgroundColor}>
      {children}
    </ParallaxScrollView>
  );
};

export default ParallaxScreenLayout;
