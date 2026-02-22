import React from 'react';
import UserForm from '../components/UserForm';
import { registerUser } from '../services/api';
import Layout from '../components/Layout';

const Signup = () => {
  return (
    <Layout>
      <UserForm mode="signup" onSubmitAction={registerUser} />
    </Layout>
  );
};

export default Signup;
