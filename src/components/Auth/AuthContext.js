// import React, { createContext, useState, useContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { jwtDecode } from 'jwt-decode';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(null);
//     const [userId, setUserId] = useState(null);

//     useEffect(() => {
//         const loadToken = async () => {
//             const storedToken = await AsyncStorage.getItem('authToken');
//             if (storedToken) {
//                 setToken(storedToken);
//                 const decodedToken = jwtDecode(storedToken);
//                 setUserId(decodedToken.id);
//             }
//         };
//         loadToken();
//     }, []);

//     const saveToken = async (newToken) => {
//         if (newToken) {
//             await AsyncStorage.setItem('authToken', newToken);
//             setToken(newToken);
//             const decodedToken = jwtDecode(newToken);
//             setUserId(decodedToken.id);
//         } else {
//             await AsyncStorage.removeItem('authToken');
//             setToken(null);
//             setUserId(null);
//         }
//     };

//     return (
//         <AuthContext.Provider value={{ token, userId, saveToken }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };
