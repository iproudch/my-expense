import { Dispatch, useState } from 'react';

export type UseModalResponse = {
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};



export default function useLoading(): UseModalResponse {
  const [loading, setLoading] = useState<boolean>(false);

  return {
    loading,
    setLoading,
  };
}
