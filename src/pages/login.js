import React, { useState } from 'react';
import Layout from 'components/layout';
import { navigate } from 'gatsby';

import { IdentityModal } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css'; // delete if you want to bring your own CSS

export default function Login() {
  const [dialog, setDialog] = React.useState(false);
  return (
    <Layout>
      <h1>Log in</h1>
      <button onClick={() => setDialog(true)}>log in</button>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={user => navigate('/admin')}
        onSignup={user => navigate('/admin')}
      />
    </Layout>
  );
}
