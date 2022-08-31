import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import SideBar from '../../../components/layouts/SideBar';
import TitlePage from '../../../components/layouts/TitlePage';
import { trpc } from '../../../utils/trpc';
import YouTube from 'react-youtube';

export default function Course() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data, isLoading } = trpc.useQuery([
    'course.get',
    { slug: 'python-1' },
  ]);
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <SideBar
      navItems={[
        { title: '1. Değişkenler', id: 1 },
        { title: '2. Operatörler', id: 2 },
        { title: '3. If', id: 3 },
      ]}
    >
      <TitlePage title="Python ile Programlama">
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
          <YouTube
            opts={{
              playerVars: {
                autoplay: 1,
              },
              width: '100%',
              height: '400px',
              className: 'absolute',
            }}
            videoId={'IzkgWNaxgNY'}
          />
          {/* END CONTENT */}
        </div>
      </TitlePage>
    </SideBar>
  );
}
