import { useEffect } from 'react';

/**
 * Custom hook to dynamically update the document title for SEO and UX.
 * @param {string} title - The title to set. " | FitForge AI" will be appended automatically.
 */
const useDocumentTitle = (title) => {
    useEffect(() => {
        const defaultTitle = 'FitForge AI';
        document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;
    }, [title]);
};

export default useDocumentTitle;
