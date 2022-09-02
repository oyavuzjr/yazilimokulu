import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Header from '../components/Header';
import TitlePage from '../components/layouts/TitlePage';

type Props = {};

export default function Iletisim({}: Props) {
  return (
    <>
      <Header open={false} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs breadcrumbs={[{ name: 'İletişim', href: '/iletisim' }]} />
      </div>
      <hr />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-3xl font-bold py-8">İletişim</div>
      </div>
    </>
  );
}
