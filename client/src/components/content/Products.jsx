import { Box, Divider, styled, Typography } from "@mui/material";
import React from "react";

import MediaCard from "../Card/MediaCard";

const Container = styled(Box)(({ theme }) => ({
  width: "80%",
  padding: "1.5em 1em",
  background: "whitesmoke",
  //   transform: "translateX(20%)",
}));

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "1em",
  width: "100%",
}));

const Header = styled(Box)(({ theme }) => ({
  padding: "1em 2em",
}));

const Products = ({ data: products, category }) => {
  return (
    <Container>
      <Header>
        <Typography gutterBottom>{category}</Typography>
        {category && <Divider sx={{ marginBottom: "2em" }} />}
      </Header>
      <Wrapper>
        {products &&
          products?.map((product) => <MediaCard payload={product} />)}
      </Wrapper>
    </Container>
  );
};

export default Products;
