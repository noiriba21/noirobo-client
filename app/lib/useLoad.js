import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

export default function useLoad(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await api(path));
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [path]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}