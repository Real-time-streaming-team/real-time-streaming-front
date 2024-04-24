import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import LoadingProvider from './context/LoadingContext';
import Loading from './Loading';

const LayoutContent = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0E0B19] bg-gradient-to-br">
      <div className="h-screen w-screen">
        <Link to="/">
          <header className="ml-5 mt-3 flex flex-row items-center justify-start">
            <img src="/images/Logo.png" alt="logo" />
          </header>
        </Link>
        <LoadingProvider>
          <Outlet />
        </LoadingProvider>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LayoutContent />
    </Suspense>
  );
};

export default Layout;
