import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  clearProductMessage
} from "../features/product/productSlice";

export const useProducts = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [sortBy] = useState("id");

  const {
    products,
    loading,
    error,
    totalPages,
    totalElements,
    successMessage
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ page, size, sortBy }));
  }, [dispatch, page, size, sortBy]);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearProductMessage());
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName = product.name || "";

      const matchesName = productName
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesPrice =
        maxPrice === "" || Number(product.price) <= Number(maxPrice);

      return matchesName && matchesPrice;
    });
  }, [products, searchText, maxPrice]);

  const createProduct = (formData) => {
    dispatch(
      addProduct({
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock)
      })
    );
  };

  const clearFilters = () => {
    setSearchText("");
    setMaxPrice("");
  };

  const goToPreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const goToNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  return {
    products,
    filteredProducts,
    loading,
    error,
    successMessage,
    totalPages,
    totalElements,
    page,
    searchText,
    maxPrice,
    setSearchText,
    setMaxPrice,
    clearFilters,
    goToPreviousPage,
    goToNextPage,
    goToPage,
    createProduct
  };
};