/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { JsonError } from 'json-api-fetch/dist/type';

interface FetchResponse<T> {
  data: T | null,
  error: JsonError | null,
  loading: boolean,
}

function isInterrupt(options?: { interrupt?: Boolean }) {
  if (options === undefined || options.interrupt === undefined) {
    return false;
  }

  return options.interrupt === true;
}

function useFetch<T>(
  serviceFn: () => Promise<T>,
  options?: { defaultData?: T, depends: Array<any>, interrupt?: Boolean },
) {
  const [response, setResponse] = useState<FetchResponse<T>>({
    data: (options?.defaultData) ? options.defaultData : null,
    loading: false,
    error: null,
  });
  const depends = options?.depends || [];

  const fetchData = async () => {
    setResponse((prevState) => ({ ...prevState, loading: true }));
    try {
      const data = await serviceFn();
      setResponse((prevState) => ({
        ...prevState,
        data,
        error: null,
      }));
    } catch (error) {
      setResponse((prevState) => ({
        ...prevState,
        error: error?.errors || error,
        data: null,
      }));
    } finally {
      setResponse((prevState) => ({ ...prevState, loading: false }));
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted && !isInterrupt(options)) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, depends);

  const refresh = useCallback(() => {
    fetchData();
  }, depends);

  return { ...response, refresh };
}

export default useFetch;
