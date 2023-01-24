import React from 'react';
import * as Label from '@radix-ui/react-label';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';

const LabelSearch = () => (
  <Flex css={{ padding: '0 20px', flexWrap: 'wrap', gap: 15, alignItems: 'left' }}>
    <LabelRoot htmlFor="search">Ingredients</LabelRoot>
    <Input type="text" id="search" placeholder='lettuce, tomato, beef, garlic' defaultValue="" />
  </Flex>
);

const LabelRoot = styled(Label.Root, {
  fontSize: 15,
  fontWeight: 500,
  lineHeight: '35px',
  color: 'black',
});

const Input = styled('input', {
  all: 'unset',
  width: 300,
  display: 'inline-flex',
  alignItems: 'left',
  justifyContent: 'left',
  borderRadius: 4,
  padding: '0 10px',
  height: 35,
  fontSize: 15,
  lineHeight: 1,
  color: 'black',
  backgroundColor: blackA.blackA5,
  boxShadow: `0 0 0 1px ${blackA.blackA9}`,
  '&:focus': { boxShadow: `0 0 0 2px black` },
});

const Flex = styled('div', { display: 'inline-flex' });

export default LabelSearch;