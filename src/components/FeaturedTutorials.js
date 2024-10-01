import React from 'react';
import { Card, Button, Container } from 'semantic-ui-react';
import { faker } from '@faker-js/faker'; // Correct import from @faker-js/faker
import TutorialCard from './TutorialCard';
import '../styles/FeaturedTutorials.css';

// Use the updated faker API
const tutorials = Array.from({ length: 3 }, () => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  author: faker.person.fullName(), // Updated method for full name
  rating: faker.number.int({ min: 4, max: 5 }), // Updated method for number
}));

const FeaturedTutorials = () => (
  <Container fluid className="featured-tutorials">
    <div className="header-container">
      <h2>Featured Tutorials</h2>
    </div>
    <div className="tutorials-container">
      <Card.Group className="card-group">
        {tutorials.map((tutorial, index) => (
          <TutorialCard key={index} tutorial={tutorial} />
        ))}
      </Card.Group>
    </div>
    <div className="button-container">
      <Button>See all tutorials</Button>
    </div>
  </Container>
);

export default FeaturedTutorials;
