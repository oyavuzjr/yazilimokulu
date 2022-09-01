import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import SideBar from '../../../components/layouts/SideBar';
import TitlePage from '../../../components/layouts/TitlePage';
import { trpc } from '../../../utils/trpc';
import YouTube from 'react-youtube';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { Course, Resource, PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';

type Props = { course: Course; part: Resource; notebook: string };

export default function CoursePage({ course, part, notebook }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <SideBar
      navItems={[
        { title: '1. Değişkenler', id: 1 },
        { title: '2. Operatörler', id: 2 },
        { title: '3. If', id: 3 },
      ]}
    >
      <TitlePage
        video={
          <YouTube
            opts={{
              playerVars: {
                autoplay: 1,
              },
              width: '100%',
              height: '700px',
              className: 'absolute',
            }}
            videoId={part?.videoId}
          />
        }
        title="Python ile Programlama"
      >
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Mobile top navigation */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-blue-600 py-2 px-4 sm:px-6 lg:px-8">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt="Workflow"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          {/* CONTENT HERE */}

          {'Content Here'}
          {/* {JSON.stringify(parts)}
          {JSON.stringify(course)}
          {JSON.stringify(part)} */}
          {/* END CONTENT */}
        </div>
      </TitlePage>
    </SideBar>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();
  //const course = await prisma.resource
  return {
    paths: [
      { params: { course: 'python-basic', part: '1' } },
      { params: { course: 'python-basic', part: '2' } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const courseSlug = params && (params.courseSlug as string);
  const partNumber = params && parseInt(params.part as string);
  const prisma = new PrismaClient();
  const course = await prisma.course.findFirst({
    where: { slug: courseSlug },
    include: { resources: true },
  });
  const part = await prisma.resource.findFirst({
    where: { courseSlug: courseSlug, part: partNumber },
  });
  console.log('part', part);
  console.log('course', course);
  console.log('NotebookUrl', part?.resourceUrl);

  const notebook = part && (await fetch(part?.resourceUrl));
  const notebookContents = notebook && (await notebook.text());
  console.log('Notebook fetch result', notebookContents);

  return {
    props: { course, part, notebook: notebookContents },
  };
};
