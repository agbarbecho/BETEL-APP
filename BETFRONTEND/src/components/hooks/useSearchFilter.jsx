// src/hooks/useSearchFilter.js
import { useState, useMemo } from 'react';

const useSearchFilter = (data, searchKeys) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!data || !searchKeys) return [];

    return data.filter(item => {
      const searchString = searchKeys
        .map(key => {
          if (key === 'pets' && item.pets) {
            return item.pets.map(pet => `${pet.name} ${item.client_name} ${item.cedula}`).join(' ');
          } else if (item[key]) {
            return item[key].toString();  // Convertir a string en caso de valores que no sean cadenas
          }
          return '';  // Asegurarse de manejar claves no existentes o valores indefinidos
        })
        .join(' ')
        .toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, data, searchKeys]);

  return { searchTerm, setSearchTerm, filteredData };
};

export default useSearchFilter;
