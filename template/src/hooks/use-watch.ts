import { useEffect, useRef } from 'react';

type Callback<T> = (prev: T | undefined) => void;
type Config = {
  isImmediate: boolean;
};

function useWatch<T>(dep: T, callback: Callback<T>, config: Config = { isImmediate: false }) {
  const { isImmediate } = config;

  const prev = useRef<T>();
  const initialized = useRef(false);
  const stop = useRef(false);

  useEffect(() => {
    const execute = () => callback(prev.current);

    if (!stop.current) {
      if (!initialized.current) {
        initialized.current = true;
        if (isImmediate) {
          execute();
        }
      } else {
        execute();
      }
      prev.current = dep;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);

  return () => {
    stop.current = true;
  };
}

export default useWatch;
