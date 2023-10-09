import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFIelds = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFIelds);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFIelds);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response =  await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();

    } catch (error) {
      if (error.code === 'auth/invalid-login-credentials') {
        alert('Invalid login credentials');
      }
      console.log(error);      
    }
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label='Email' name='email' value={email} type="email" required onChange={handleChange} />
        <FormInput label='Password' name='password' value={password} type="password" required onChange={handleChange} />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType='google'>Google Sign In</Button>
        </div>
      </form>

    </div>
  );
};

export default SignInForm;