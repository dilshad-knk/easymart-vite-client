import { useState, useEffect } from 'react';
import instance from '../axios/axios';

const useProductCategories = () => {
  const [categories, setCategories] = useState([]);

   useEffect(() => {
    fetchCategories();
  }, []);

  

   const generateSlug = (text) => {
    return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

   const fetchCategories = async () => {
    try {
      const response = await instance.get('/category/fetch', { withCredentials: true });
      const data = response.data;

     
      const categoriesWithSlugs = data.categories.map(category => ({
        ...category,
        slug: generateSlug(category.name)
      }));

      setCategories(categoriesWithSlugs);
    } catch (error) {
      console.error('Error fetching pending categories:', error);
    }
  };



  return categories;
};

export default useProductCategories;

