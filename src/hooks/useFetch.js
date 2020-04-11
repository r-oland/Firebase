import { useEffect, useState } from "react";

export const useFetch = ({ url, header, type = "json" }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(url, header)
      .then((r) => {
        return type === "json" ? r.json() : r.text();
      })
      .then((result) => {
        setResponse(result);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [url, header, type]);

  return [response, loading];
};
