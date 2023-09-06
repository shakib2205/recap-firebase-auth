import './App.css';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup (auth, googleProvider)
    .then( result => {
      const user = result.user;
      setUser(user)
      console.log(user)
    })
    .catch( error => {
      console.log('error: ', error);
    })
  }
  const handleSignOut =() => {
    signOut(auth)
    .then( () => {
      setUser({});
    })
    .catch(error => {
      console.log('error: ', error);
    })
  }
  return (
    <div className="App">
      
      {
        user.uid ?
        <button onClick={handleSignOut}>SignOutt</button>
        :
        <button className='btn' onClick={handleGoogleSignIn}>Google SignIn</button>
        
      }

      {
         user.uid && <div>
          <img src={user.photoURL} alt="" />
          <h3>Name: {user.displayName}</h3>
          <p><small>Email: {user.email}</small></p>
         </div>
      }
    </div>
  );
}

export default App;
