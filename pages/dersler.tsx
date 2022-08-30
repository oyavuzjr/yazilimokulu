import React from 'react';
import fs from 'fs';
import path from 'path';
type Props = {};

export default function Desler({}: Props) {
  return <div>Desler</div>;
}

export async function getStaticPaths() {
  const coursesPath = path.join(process.cwd(), 'dersler');
  const courses = fs
    .readdirSync(coursesPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  console.log('@@@@@@@@', courses);

  return {
    paths: {
      params: [{ id: '1' }],
    },
    fallback: false,
  };
}
