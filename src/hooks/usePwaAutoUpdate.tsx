import { useEffect } from 'react';

export const usePwaAutoUpdate = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      let refreshing = false;

      // Step 1: Listen for the new controller to take over
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });

      navigator.serviceWorker.getRegistration().then((registration) => {
        if (!registration) return;

        // Step 2: If there's an update waiting, activate it now
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

        // Step 3: Listen for updates being found
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });
      });
    }
  }, []);
};
