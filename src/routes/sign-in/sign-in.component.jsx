
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    
  };

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign In with Google</button>
    </div>
  );
}

export default SignIn;