import Toolbar from './components/Toolbar/Toolbar.tsx';
import Page from './components/Page/Page.tsx';
import {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import axiosApi from './axiosApi.ts';

interface PageData {
  id: string;
  title: string;
  content: string;
}

const App = () => {
  const location = useLocation();
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: pagesData } = await axiosApi.get<{ [key: string]: PageData }>('/pages.json');

      if (!pagesData) {
        setPages([]);
      } else {
        const newPages = Object.keys(pagesData).map((id) => ({
          ...pagesData[id],
          id,
        }));
        setPages(newPages);
      }
    } catch (e) {
      setError('Failed to load pages.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchPages();
    }
  }, [fetchPages, location]);

  return (
    <>
      <header>
        <Toolbar pages={pages} />
      </header>
      <main className="container-fluid">
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/pages/:pageId" element={<Page />} />

          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
