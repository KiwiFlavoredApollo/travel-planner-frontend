/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/axios';

const AccessTokenContext = createContext();

export const useAccessToken = () => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error('useAccessToken must be used within AccessTokenContextProvider');
  }
  return context;
};

export const AccessTokenContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));

  const login = async (userId, password) => {
    const { data } = await api.post('/auth/login', { userId, password });
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common.Authorization;
    window.location.href = '/login';
  };

  const refresh = async () => {
    if (!refreshToken) return false;
    try {
      const { data } = await api.post('/auth/refresh', { refreshToken });
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return true;
    } catch {
      logout();
      return false;
    }
  };

  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }, [accessToken]);

  return (
    <AccessTokenContext.Provider value={{ accessToken, refreshToken, login, logout, refresh }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
