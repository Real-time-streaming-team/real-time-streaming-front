import { createContext, useMemo, useState } from 'react';
import Loading from '../Loading';

export const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
});

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   console.log(isLoading);
  // }, [isLoading]);

  const contextValue = useMemo(
    () => ({
      isLoading,
      setIsLoading,
    }),
    [isLoading, setIsLoading],
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {isLoading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
