import { useEffect } from 'react';

const DocumentTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default DocumentTitle;
