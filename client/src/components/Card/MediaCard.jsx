import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Chip, styled } from "@mui/material";

const PriceWrapper = styled(Box)(({ theme }) => ({
  padding: "1em",
  display: "flex",
  gap: "1em",
  flexWrap: "wrap",
}));

const PriceText = styled(Typography)(({ theme, discount }) => ({
  // background: discount ? "red" : "none",
  overflow: "hidden",
  margin: "auto 0",
  color: "#3D4F58",
  position: "relative",
  zIndex: 100,
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    zIndex: 10000,
    width: "100%",
    height: "2px",
    background: "#ACAEAF",
    transform: "rotate(15deg)",
    display: discount ? "block" : "none",
  },
  // padding: "0.5em",
}));

const DiscountWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
}));

export default function MediaCard({ payload }) {
  const getPriceDiscount = (total, discount) => {
    const price = discount.split("\n\n").shift();
    const totolPrice = total.replace(/,/, "");
    const newPrice = Number(totolPrice) - Number(price);

    return newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getDiscount = (discount) => {
    return discount.split("\n\n").shift();
  };

  const isDiscount = payload.discount !== "" ? 1 : undefined;
  return (
    <Card sx={{ maxWidth: 220, minWidth: 220 }}>
      <CardMedia
        component="img"
        height="200"
        image={payload.image}
        alt="green iguana"
      />
      <Box>
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            {payload.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {payload.spec}
          </Typography>
          <PriceWrapper>
            <PriceText
              variant="subtitle2"
              discount={isDiscount}
            >{`${payload.price}.-`}</PriceText>

            {isDiscount && (
              <Chip
                label={`${getPriceDiscount(payload.price, payload.discount)}.-`}
                color="primary"
              />
            )}
          </PriceWrapper>

          {isDiscount && (
            <DiscountWrapper>
              <Chip
                label={`Discount ${getDiscount(payload.discount)}.-`}
                color="success"
                variant="outlined"
                size="small"
              />
            </DiscountWrapper>
          )}
        </CardContent>
      </Box>
    </Card>
  );
}
