import React, { useState, useEffect } from 'react';
import axiosApi from '../../axiosApi.ts';

interface PageData {
  title: string;
  content: string;
}

interface Page {
  id: string;
  title: string;
}

const Admin: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [pageData, setPageData] = useState<PageData>({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosApi.get('/pages.json');
        if (response.data) {
          const pagesArray = Object.keys(response.data).map(id => ({
            id,
            title: response.data[id].title,
          }));
          setPages(pagesArray);
          setSelectedPage(pagesArray[0]?.id || '');
        }
      } catch (e) {
        setError('Failed to load pages.');
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  useEffect(() => {
    const fetchPageData = async () => {
      if (selectedPage) {
        try {
          setError(null);
          const response = await axiosApi.get(`/pages/${selectedPage}.json`);
          if (response.data) {
            setPageData(response.data);
          }
        } catch (e) {
          setError('Failed to load page data.');
        }
      }
    };

    fetchPageData();
  }, [selectedPage]);

  const handleSave = async () => {
    try {
      setSaveError(null);
      await axiosApi.put(`/pages/${selectedPage}.json`, pageData);
      window.location.href = `/pages/${selectedPage}`;
    } catch (e) {
      setSaveError('Failed to save page data.');
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
        {pages.map((page) => (
          <option key={page.id} value={page.id}>
            {page.title}
          </option>
        ))}
      </select>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={pageData.title}
            onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            id="content"
            value={pageData.content}
            onChange={(e) => setPageData({ ...pageData, content: e.target.value })}
          />
        </div>
        {saveError && <p className="text-danger">{saveError}</p>}
        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default Admin;
