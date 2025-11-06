import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import { useDispatch } from 'react-redux'
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { setUserProfile } from './store/authSlice';
import { getUserProfile } from './services/userService';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser.uid);
        dispatch(setUserProfile(userProfile));
      }else {
        dispatch(setUserProfile(null));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <RouterProvider router={router} />
  )
}

export default App
