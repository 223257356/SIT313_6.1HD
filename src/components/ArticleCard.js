import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import { randImg } from '@ngneat/falso';

const ArticleCard = ({ article }) => (
  <Card>
    <Image src={randImg({ width: 150, height: 150 })} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{article.title}</Card.Header>
      <Card.Meta>{article.author}</Card.Meta>
      <Card.Description>{article.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Rating icon='star' defaultRating={article.rating} maxRating={5} disabled />
    </Card.Content>
  </Card>
);

export default ArticleCard;
