import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import ScreenReader from "./screenReader";

export default function ScheduleItem(props) {
  const { show, start, end } = props.item;
  const { name, id, image, rating } = show;

  const showLink = `/showitem/${id}`;

  const starRating = rating.average;
  const keys = !(image == null) ? Object.keys(image) : [];
  const imageUrl = keys.includes("medium")
    ? image.medium
    : "/image-not-found.png";

  return (
    <Card
      sx={{
        height: 380,
        overflowY: "scroll",
        mb: 1.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia sx={{ height: 140 }} image={imageUrl} title={name} />

      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: "1",
        }}
      >
        <Typography variant="h5" color="text.secondary" gutterBottom>
          <Rating name="read-only" value={starRating} readOnly />
        </Typography>
        <Typography
          style={{ flexGrow: "1" }}
          variant="h5"
          color="text.secondary"
          gutterBottom
        >
          {name}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          <ScreenReader value="airtime" /> {start.format("hh:mm A")} -{" "}
          {end.format("hh:mm A")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={showLink} size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
