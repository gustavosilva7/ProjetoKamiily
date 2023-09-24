import { createContext, Dispatch, SetStateAction } from 'react';

interface StoreContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

const StoreContext = createContext<StoreContextType>({
  token: null,
  setToken: () => {},
});

export default StoreContext;
