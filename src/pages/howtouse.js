import React, { useState } from 'react';
import Layout from 'components/layout';
import { navigate } from 'gatsby';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';

import { IdentityModal } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css'; // delete if you want to bring your own CSS

import Category from 'images/2020-05-07_18-31-23.jpg';
import NewCategory from 'images/2020-05-07_18-40-41.jpg';
import PublishNow from 'images/2020-05-07_18-42-22.jpg';
import NewQuestion from 'images/2020-05-07_18-46-26.jpg';
import Relation from 'images/2020-05-07_18-47-43.jpg';

export default function HowToUse() {
  const [dialog, setDialog] = React.useState(false);
  return (
    <Layout>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={user => navigate('/admin')}
      />
      <Box mt={10}>
        <Container maxWidth="sm">
          <Typography variant="h1">How to use</Typography>
          <Box mt={5}>
            <Typography variant="h5" component="p">
              Anybody can add new categories and questions to the Quiz app by
              logging into the admin panel at{' '}
              <Link to="/admin/">
                https://wheel-of-fortune-quiz.netlify.app/admin
              </Link>{' '}
              , clicking `Login with Netlify identity` and entering the email
              and password. Alternatively you can click the login button below{' '}
            </Typography>
            <Box
              alignItems="center"
              justifyContent="center"
              display="flex"
              my={5}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDialog(true)}
              >
                <Typography variant="h4" component="span">
                  Log in
                </Typography>
              </Button>
            </Box>
            <Box mb={5}>
              <Typography variant="h5" component="p">
                You will only be able to login using the Email and password
                method. Please email{' '}
                <a href="mailto:james@inetdigital.co.uk">
                  james@inetdigital.co.uk
                </a>{' '}
                if you would like login details
              </Typography>
            </Box>
            <Box mb={5}>
              <Box mb={3}>
                <Typography variant="h3">Adding a new category</Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="h4">
                  Please note: after publishing new categories and questions
                  they can take up to 10 minutes to appear live on the app
                </Typography>
              </Box>
              <Typography variant="h5" component="p">
                Once inside the admin panel select `Category` from the
                `Collections` panel on the left hand side
              </Typography>
              <Box px={10} pt={3} mb={3}>
                <img className="w-100" src={Category} alt="Logo" />
              </Box>
              <Typography variant="h5" component="p">
                Then select `New Category`
              </Typography>
              <Box px={10} pt={3} mb={3}>
                <img className="w-100" src={NewCategory} alt="Logo" />
              </Box>
              <Typography variant="h5" component="p">
                Type in the title of the new category in the `Title` field, then
                select Publish now in the top right hand corner
              </Typography>
              <Box px={10} pt={3} mb={3}>
                <img className="w-100" src={PublishNow} alt="Logo" />
              </Box>
            </Box>
            <Box mb={5}>
              <Box mb={3}>
                <Typography variant="h3">Adding a new question</Typography>
              </Box>
              <Typography variant="h5" component="p">
                Select `Question` from the `Collections` panel on the left hand
                side. Then select `New question`
              </Typography>
              <Box px={10} pt={3} mb={3}>
                <img className="w-100" src={NewQuestion} alt="Logo" />
              </Box>
              <Typography variant="h5" component="p">
                Type in the question and answer into the relevant fields, then
                select the category the question belongs to in the `Relation`
                drop down box
              </Typography>
              <Box px={10} pt={3} mb={3}>
                <img className="w-100" src={Relation} alt="Logo" />
              </Box>
              <Typography variant="h5" component="p">
                Select Publish now in the top right hand corner
              </Typography>
              <Box px={10} pt={3} mb={3}>
                <img className="w-100" src={PublishNow} alt="Logo" />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}
