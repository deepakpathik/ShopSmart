import React from 'react';
import UserForm from '../components/UserForm';
import { loginUser } from '../services/api';
import Layout from '../components/Layout';

const Login = () => {
  return (
    <Layout>
      <UserForm mode="login" onSubmitAction={loginUser} />
    </Layout>
  );
};

export default Login;
