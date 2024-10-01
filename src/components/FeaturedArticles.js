import React from 'react';
import { Card, Button, Container } from 'semantic-ui-react';
import { faker } from '@faker-js/faker'; // Correct import from @faker-js/faker
import ArticleCard from './ArticleCard';
import '../styles/FeaturedArticles.css';

// Use the updated faker API
const articles = Array.from({ length: 3 }, () => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  author: faker.person.fullName(), // Updated method to get a full name
  rating: faker.number.int({ min: 4, max: 5 }), // Updated method for generating a number
}));

const FeaturedArticles = () => (
  <Container fluid className="featured-articles">
    <div className="header-container">
      <h2>Featured Articles</h2>
    </div>
    <div className="articles-container">
      <Card.Group className="card-group">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </Card.Group>
    </div>
    <div className="button-container">
      <Button>See all articles</Button>
    </div>
  </Container>
);

export default FeaturedArticles;
