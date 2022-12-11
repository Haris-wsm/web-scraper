import React from "react";
import { Box, Divider, styled, Typography } from "@mui/material";
import SidbarHeader from "./Header";

import { getCategories } from "../../http";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled(Box)(({ theme }) => ({
  width: "20%",
  position: "relative",
  borderRight: "1px solid #e3e3e3",
  zIndex: 10000,
}));

const Wrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  position: "fixed",
  top: "0",
  left: "0",
  width: "20%",
  borderRight: "1px solid #e3e3e3",
}));

const SidebarItemsWrapper = styled(Box)(({ theme }) => ({
  margin: "2em 0 4em 0",
  maxHeight: "calc(100vh - 1.5em)",
  overflowY: "auto",
  padding: "1em 1em 1.5em 1em",
  height: "calc(100vh - 1em - 4em - 0.25em)",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const Items = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  maxWidth: "13em",
  "& :hover": {
    background: "#e7e4e4",
    borderRadius: "15px",
  },
}));

const TextItem = styled(Typography)(({ theme }) => ({
  padding: "1em",
  fontSize: "0.5em",
}));

const CustomDivider = styled(Divider)(({ theme }) => ({
  margin: "0.75em 0",
}));

const Sidebar = ({ setCategory }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    requestGetCategories();
  }, []);

  const requestGetCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (name) => {
    setCategory(name);
  };

  return (
    <Container>
      <Wrapper>
        <SidbarHeader setCategory={setCategory} />
        <SidebarItemsWrapper>
          {categories &&
            categories.map((category, i) => {
              const divided = i !== categories.length - 1 && i % 4 === 0;
              return (
                <Box key={i}>
                  <Items
                    onClick={() => {
                      handleClick(category.product_type);
                    }}
                  >
                    <TextItem variant="subtitle2">
                      {category.product_type}
                    </TextItem>
                  </Items>
                  {divided && <CustomDivider />}
                </Box>
              );
            })}
        </SidebarItemsWrapper>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
