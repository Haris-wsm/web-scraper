import { Box, styled, Typography } from "@mui/material";
import React from "react";
import WelcomePic from "../assets/img/programming.png";

const Container = styled(Box)(({ theme }) => ({
  width: "80%",
  padding: "1.5em 1em",
  background: "whitesmoke",
  //   transform: "translateX(20%)",
}));

const Header = styled(Box)(({ theme }) => ({
  padding: "1em 2em",
  textAlign: "center",
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const Introduce = () => {
  return (
    <Container>
      <Header>
        <Typography gutterBottom>Web Scrapper </Typography>
      </Header>
      <ImageWrapper>
        <img src={WelcomePic} alt="Welcome" height={400} />
      </ImageWrapper>
    </Container>
  );
};

export default Introduce;
