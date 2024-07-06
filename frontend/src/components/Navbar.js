import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-700';
  };

  return (
    <nav className="bg-white h-screen w-64 border-r border-gray-200 fixed left-0 top-0 p-4">
      <div className="mb-8 flex items-center">
        <svg className="h-8 w-8 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z" />
          <path strokeLinecap="round" strokeWidth={2} d="M9 5v14M15 5v14" />
        </svg>
        <span className="text-xl font-bold">ブログアプリ</span>
      </div>
      <ul className="space-y-4">
        <li>
          <Link to="/" className={`flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 ${isActive('/')}`}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>ホーム</span>
          </Link>
        </li>
        <li>
          <Link to="/posts" className={`flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 ${isActive('/posts')}`}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span>記事一覧</span>
          </Link>
        </li>
        <li>
          <Link to="/create" className={`flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 ${isActive('/create')}`}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>新規投稿</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;