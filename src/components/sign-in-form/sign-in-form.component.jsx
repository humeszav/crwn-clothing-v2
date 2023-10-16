import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss'
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

const defaultFormFIelds = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFIelds);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFIelds);
  };

  /**
   * Handle sign in with email and password
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      dispatch(emailSignInStart, {email, password});

      resetFormFields();

    } catch (error) {
      if (error.code === 'auth/invalid-login-credentials') {
        alert('Invalid login credentials');
      }
      console.error(error);      
    }
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
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
          <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
        </div>
      </form>

    </div>
  );
};

export default SignInForm;