export const fetchData = async (fileName) => {
    try {
      const response = await fetch(`/${fileName}.json`);
      if (!response.ok) throw new Error("Failed to fetch data");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  