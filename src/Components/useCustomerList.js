import { useEffect, useState } from "react";
import { getCustomerApi } from "../api";
export default function useCustomerList(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    //   start the loader
    setLoading(true);
    setError(false);
    getCustomerApi(pageNumber)
      .then((resp) => {
        console.log(resp);
        // New Data will get spread along with previous data
        setCustomers((prevCustomers) => [...prevCustomers, ...resp.data.data]);
        setLoading(false);
        setHasMore(resp.data.data.length > 0);
      })
      .catch((error) => {
        setError(true);
      });
  }, [pageNumber]);
  return { loading, customers, error, hasMore };
}
