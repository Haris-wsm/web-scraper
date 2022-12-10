import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

import { Box, styled } from "@mui/material";
import { useEffect } from "react";
import { getProducts } from "../http";
import Products from "../components/content/Products";
import Introduce from "../components/Introduce";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
}));

const Dashboard = () => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (category) {
      requestGetProducts();
    } else {
      setProducts(null);
    }
  }, [category]);

  const requestGetProducts = async () => {
    try {
      const { data } = await getProducts({ category });
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Sidebar setCategory={setCategory} />
      {category ? (
        <Products data={products} category={category} />
      ) : (
        <Introduce />
      )}
    </Container>
  );
};

export default Dashboard;
