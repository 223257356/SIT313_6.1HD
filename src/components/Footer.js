import React from 'react';
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";


const Footer = () => (
  <Segment vertical style={{ padding: '5em 0em', backgroundColor: '#008b8b', color: 'white' }}>
    <Container>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header inverted as="h3" content="Explore" />
            <List link inverted>
              <List.Item as="a">Home</List.Item>
              <List.Item as="a">Questions</List.Item>
              <List.Item as="a">Articles</List.Item>
              <List.Item as="a">Tutorials</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header inverted as="h3" content="Support" />
            <List link inverted>
              <List.Item as="a">FAQs</List.Item>
              <List.Item as="a">Help</List.Item>
              <List.Item as="a">Contact Us</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header inverted as="h3" content="Stay connected" />
            <div style={{ display: 'flex', justifyContent: 'left', gap: '10px' }}>
              <List.Item as="a" style={{ color: 'white' }} href="#"><FaFacebookSquare size="2em" /></List.Item>
              <List.Item as="a" style={{ color: 'white' }} href="#"><FaSquareXTwitter size="2em" /></List.Item>
              <List.Item as="a" style={{ color: 'white' }} href="#"><FaInstagramSquare size="2em" /></List.Item>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <p>DEV@Deakin 2022</p>
            <List horizontal inverted link>
              <List.Item as="a">Privacy Policy</List.Item>
              <List.Item as="a">Terms</List.Item>
              <List.Item as="a">Code of Conduct</List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;
