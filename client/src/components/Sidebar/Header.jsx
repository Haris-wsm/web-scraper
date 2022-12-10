import { Box, styled, Typography } from "@mui/material";
import React from "react";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";

const Wrapper = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(145deg, rgba(255,95,109,1) 0%, rgba(255,195,113,1) 100%)",
  padding: "0.5em 1em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.25em",
  cursor: "pointer",
}));
const Logo = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "1em",
  fontWeight: "bold",
  textTransform: "capitalize",
}));

const Icon = styled(ExploreOutlinedIcon)(({ theme }) => ({
  color: "#fff",
}));

const Header = ({ setCategory }) => {
  return (
    <Wrapper onClick={() => setCategory(null)}>
      <Icon />
      <Logo variant="overline">Scrapper</Logo>
    </Wrapper>
  );
};

export default Header;
