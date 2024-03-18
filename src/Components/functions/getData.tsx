import { useState } from "react";

const useGetData = () => {
  const [data, setData] = useState<{ [key: string]: string; }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const fetchData = async (url: string, errorMessage: string, successMessage: string) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(errorMessage);
      }
      const jsonData = await response.json();
      console.log(jsonData,"jsonData")
      setData(jsonData);
      setSuccessMessage(successMessage);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, successMessage, fetchData };
};

export default useGetData;
