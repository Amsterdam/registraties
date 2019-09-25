import { useEffect } from 'react';

const defaultTitle = 'Registratie';

const DocumentTitle = ({ title }) => {
  const setDocumentTitle = newTitle => {
    document.title = newTitle;
  };
  useEffect(() => {
    setDocumentTitle(title);
    return () => setDocumentTitle(defaultTitle);
  }, [title]);

  return null;
};

export default DocumentTitle;
