import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { roleEnum, roleEnumType, userKey } from "../utils";

interface IUser {
  name: string;
  email: string;
}

interface UserProps {
  name: string;
  role: roleEnumType | null;
}

interface Props extends UserProps {
  updateUser(value: IUser): void;
}

interface IProvider {
  children: ReactNode;
}

const user = createContext<null | Props>(null);

export const UserProvider = ({children}: IProvider) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<roleEnumType | null>(null);
  const { setItem, getItem, removeItem } = useAsyncStorage(userKey);

  const updateUser = useCallback(async (value: IUser) => {
    setName(value.name);
    if (value.email.includes('aluno')) {
      setRole(roleEnum.STUDENT);
      await setItem(JSON.stringify({
        name: value.name,
        role: roleEnum.STUDENT
      }))
    } else {
      setRole(roleEnum.TEACHER);
      await setItem(JSON.stringify({
        name: value.name,
        role: roleEnum.TEACHER
      }))
    }
  }, []);

  useEffect(() => {
    (async () => {
      const item = await getItem()
      if (item) {
        const data = JSON.parse(item);
        setRole(data.role)
        setName(data.name)
      }
    })()
  }, [])

  // useEffect(() => {
  //   (() => {
  //     removeItem()
  //   })()
  // }, [])

  return (
    <user.Provider value={{ role, name, updateUser }}>
      {children}
    </user.Provider>
  )
};


export const useUser = () => {
  const context = useContext(user);
  if (!context) throw new Error('não achou contexto')
  return context;
}