import React from 'react';
import renderer from 'react-test-renderer';
import Upload from '@/components/Upload';

test('Button change', () => {
  const components = renderer.create(<Upload />);
});
