import React from 'react';
import Layout from 'components/layout';

function Login() {
  return (
    <Layout>
      <div data-netlify-identity-menu></div>

      <div data-netlify-identity-button>Login with Netlify Identity</div>
    </Layout>
  );
}

export default Login;
