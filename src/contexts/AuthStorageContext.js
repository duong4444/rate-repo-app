// tạo context provider để truyền value cho các component con
// <Context.Provider value={sth}>
//     <Component />
// </Context.Provider>
import { createContext } from 'react';

const AuthStorageContext = createContext();

export default AuthStorageContext;