import React from 'react';
import { Image } from 'semantic-ui-react';
import { randImg } from '@ngneat/falso';

const ImageHeader = () => (
  <Image src={randImg({ width: 1200, height: 400 })} fluid />
);

export default ImageHeader;
