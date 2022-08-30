import React from 'react';
import fs from 'fs';
type Props = {};

export default function Desler({}: Props) {
  return <div>Desler</div>;
}

export async function getStaticPaths() {
  const courses = fs.readdirSync('.');
  console.log('@@@@@@@@', courses);

  return {
    paths: {
      params: [{ id: 1 }],
    },
    fallback: false,
  };
}
