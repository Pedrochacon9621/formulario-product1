import { createContext, useContext, useState, useEffect } from 'react';
import { rolUser } from '../api/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // datos del usuario
  const [loading, setLoading] = useState(true); // para controlar el render inicial

  const cargarUser = async () => {
    try {
      const res = await rolUser(); // función que llama /me/
      setUser(res.data);
    } catch (err) {
      console.error('Error al obtener el usuario:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUser(); // se ejecuta al montar la app
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, refreshUser: cargarUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
