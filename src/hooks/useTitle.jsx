import { useEffect } from "react";

const useTitle = (title, faviconUrl) => {
  useEffect(() => {
    const prevTitle = document.title;
    const prevFavicon = getFaviconHref();

    console.log("Previous favicon URL:", prevFavicon);

    document.title = title;
    setFavicon(faviconUrl);

    return () => {
      document.title = prevTitle;
      setFavicon(prevFavicon);
    };
  }, [title, faviconUrl]);
};

const getFaviconHref = () => {
  const faviconTag = document.querySelector("link[rel='icon']");
  return faviconTag ? faviconTag.getAttribute("href") : null;
};

const setFavicon = (url) => {
  const faviconTag = document.querySelector("link[rel='icon']");

  if (faviconTag) {
    faviconTag.setAttribute("href", url);
  } else {
    console.warn("Favicon <link> tag not found in <head>.");
  }
};

export default useTitle;
