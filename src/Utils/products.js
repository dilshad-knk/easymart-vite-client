import { useState, useEffect } from 'react';
import instance from '../axios/axios';

const useGetProducts = (initialCategoryName, initialPage = 1, limit,keyword) => {
  const[categoryName,setCategoryName] = useState(initialCategoryName)
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(keyword);
  





  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await instance.get('/products', {
          params: {
            categoryName,
            currentPage,
            limit,
            keyword : query ,
          },
        });
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.totalItems);
       
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName, currentPage, limit,query]);


  const updateCategoryName = (newCategoryName) => {
    setCategoryName(newCategoryName);
    setCurrentPage(1);
  };

  return { products, currentPage, setCurrentPage, updateCategoryName, totalPages,setQuery, loading, totalItems};
};

export default useGetProducts;

