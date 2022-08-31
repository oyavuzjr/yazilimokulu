import React from 'react';
import fs from 'fs';
import path from 'path';
type Props = { courses: string[] };

export default function Desler({ courses }: Props) {
  return (
    <div className="p-4 pb-2">
      <div className="text-2xl underline text-red-400">Dersler</div>
      {courses.map((course) => (
        <div key={course}>{course}</div>
      ))}
    </div>
  );
}

export async function getStaticProps(context: any) {
  const coursesPath = path.join(process.cwd(), '..', 'dersler');
  const courses = fs
    .readdirSync(coursesPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return {
    // Passed to the page component as props
    props: { courses: courses },
  };
}
