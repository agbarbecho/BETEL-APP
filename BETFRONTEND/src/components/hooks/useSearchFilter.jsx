import { useState, useMemo } from 'react';

const useSearchFilter = (data, searchKeys) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!data || !searchKeys) return [];

    return data.filter(item => {
      const searchString = searchKeys
        .map(key => {
          if (key === 'pets') {
            return item.pets.map(pet => `${pet.pet_name} ${item.full_name}`).join(' ');
          } else {
            return item[key];
          }
        })
        .join(' ')
        .toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, data, searchKeys]);

  return { searchTerm, setSearchTerm, filteredData };
};

export default useSearchFilter;