import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi.ts';

interface PageData {
  title: string;
  content: string;
}

const Page: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageData = async () => {
      if (pageId) {
        try {
          setLoading(true);
          setError(null);
          const response = await axiosApi.get(`/pages/${pageId}.json`);
          if (response.data) {
            setPageData(response.data);
          } else {
            setError('Page not found.');
          }
        } catch (e) {
          setError('Failed to load page data.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPageData();
  }, [pageId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!pageData) return null;

  return (
    <div>
      <h1>{pageData.title}</h1>
      <p>{pageData.content}</p>
    </div>
  );
};

export default Page;
