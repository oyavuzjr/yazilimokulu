import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SideBar from "../../../components/layouts/SideBar";
import TitlePage from "../../../components/layouts/TitlePage";
import { trpc } from "../../../utils/trpc";
import YouTube from "react-youtube";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { Course, Resource, PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { IpynbRenderer } from "react-ipynb-renderer";
import "katex/dist/katex.min.css";
import { title } from "process";
// import 'react-ipynb-renderer/dist/styles/grade3.css';
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Breadcrumbs from "../../../components/Breadcrumbs";
type Props = {
  course: Course;
  part: Resource;
  notebook: string;
  parts: Resource[];
};

export default function CoursePage({ course, part, notebook, parts }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notebookJSON = JSON.parse(notebook);
  return (
    <SideBar
      topOfBar={
        <span>
          {" "}
          <div className="text-white text-lg">
            <span className="text-2xl pr-2 font-thin">
              <Link href={`/dersler/${course.slug}`}>{"<"}</Link>
            </span>
            {course.name}
          </div>
        </span>
      }
      navItems={parts.map((part) => ({
        title: part.id + "." + part.title,
        id: part.part,
      }))}
      selectedIndex={part.part - 1}
    >
      <TitlePage
        breadcrumbs={
          <Breadcrumbs
            breadcrumbs={[
              { name: "Dersler", href: "/dersler" },
              { name: course.name, href: `/dersler/${course.slug}` },
              { name: part.title, href: `/dersler/${part.part}` },
            ]}
          />
        }
        video={
          <YouTube
            opts={{
              playerVars: {
                autoplay: 1,
              },
              width: "100%",
              height: "700px",
              className: "absolute",
            }}
            videoId={part?.videoId}
          />
        }
        title={part.title}
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
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          {/* CONTENT HERE */}

          <IpynbRenderer
            ipynb={notebookJSON}
            syntaxTheme="xonokai"
            language="python"
            bgTransparent={true}
            formulaOptions={{
              // optional
              renderer: "mathjax", // katex by default
              katex: {
                delimiters: "gitlab", // dollars by default
                katexOptions: {
                  fleqn: false,
                },
              },
            }}
          />
          {/* END CONTENT */}
        </div>
      </TitlePage>
    </SideBar>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();
  const courses = await prisma.course.findMany({
    include: { resources: true },
  });
  const parameters = courses.map((course) =>
    course.resources.map((resource) => ({
      params: {
        course: resource.courseSlug,
        part: resource.part.toString(),
      },
    }))
  );
  return {
    // eslint-disable-next-line prefer-spread
    paths: parameters.flat(),
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

  const notebook = part && (await fetch(part?.resourceUrl));
  const notebookContents = notebook && (await notebook.text());
  console.log("@@@COURSE", course);
  return {
    props: {
      course,
      part,
      notebook: notebookContents,
      parts: course && course.resources,
    },
  };
};
