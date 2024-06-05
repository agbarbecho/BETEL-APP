// src/hooks/useSearchFilter.js
import { useState, useMemo } from 'react';

const useSearchFilter = (data, searchKeys) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!data || !searchKeys) return [];

    return data.filter(item =>
      searchKeys.some(key =>
        item[key]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data, searchKeys]);

  return { searchTerm, setSearchTerm, filteredData };
};

export default useSearchFilter;