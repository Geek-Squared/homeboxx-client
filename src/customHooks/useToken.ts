import { useState, useEffect } from 'react';

export function useToken() {
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setToken(token);
  }, []);

  return token;
}