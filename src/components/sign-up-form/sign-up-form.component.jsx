import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFIelds = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFIelds);
  const { displayName, email, password, confirmPassword } = formFields;
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFIelds);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      
      resetFormFields();

    } catch (error) {

      if (error.code === 'auth/email-already-in-use') {
        alert('An account with this email already exists');
      }

      console.error('User creation encountered an error', error.message);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label='Display Name' name='displayName' value={displayName} type="text" required onChange={handleChange} />
        <FormInput label='Email' name='email' value={email} type="email" required onChange={handleChange} />
        <FormInput label='Password' name='password' value={password} type="password" required onChange={handleChange} />
        <FormInput label='Confirm Password' name='confirmPassword' value={confirmPassword} type="password" required onChange={handleChange} />

        <Button type="submit">Sign Up</Button>
      </form>

    </div>
  );
};

export default SignUpForm;