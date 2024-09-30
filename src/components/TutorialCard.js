import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import { randImg } from '@ngneat/falso';

const TutorialCard = ({ tutorial }) => (
  <Card>
    <Image src={randImg({ width: 640, height: 480 })} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{tutorial.title}</Card.Header>
      <Card.Meta>{tutorial.author}</Card.Meta>
      <Card.Description>{tutorial.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Rating icon='star' defaultRating={tutorial.rating} maxRating={5} disabled />
    </Card.Content>
  </Card>
);

export default TutorialCard;
