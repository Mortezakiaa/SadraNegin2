import React, { useEffect } from 'react';
import { MainStateManager } from 'models';
import { Redirecting } from 'router';
import { Footer } from 'layouts';
import { SelfBackDrop } from 'components/Backdrop';
import { useForceUpdate } from 'utilities';

interface AppProps {
  mainStateManager: MainStateManager;
}

export function App({
  mainStateManager,
}: AppProps) {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    mainStateManager.Eventing.on('loadedData', () => {
      forceUpdate();
    });

    return () => {
      mainStateManager.Eventing.remove('loadedData');
    }
  }, [mainStateManager, forceUpdate]);

  if (!mainStateManager.Usering.dataLoded) {
    return <SelfBackDrop show progress />
  }

  return (
    <div className="App">
      <Redirecting mainStateManager={mainStateManager} />
      <Footer mainStateManager={mainStateManager} />
    </div>
  );
}
