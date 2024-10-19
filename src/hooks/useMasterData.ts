import { useEffect, useState } from "react";
import { IMasterData } from "../interface/master-data";
import { getMasterData } from "../service/master-data";

export type UseMasterDataResponse = {
  categories: IMasterData[];
};

export default function useMasterData(): UseMasterDataResponse {
  const [categories, setCategories] = useState<IMasterData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getMasterData("CATEGORY");
      if (!categories || categories?.length === 0) return;
      setCategories(categories);
      return categories;
    };

    fetchCategories();
  }, []);

  return {
    categories,
  };
}
