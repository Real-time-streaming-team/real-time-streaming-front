import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import LoadingProvider from './context/LoadingContext';
import Loading from './Loading';
import Search from './Search/Search';

const LayoutContent = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="h-screen w-screen">
        <header className="mb-12 mt-3 flex flex-row items-center justify-between">
          <Link to="/" className="ml-5">
            <img src="/images/Logo.png" alt="logo" />
          </Link>
          <Search />
          {/* SIGNIN / SIGNUP */}
          <Link to="/login" className="mr-8">
            <div>로그인</div>
          </Link>
        </header>
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
