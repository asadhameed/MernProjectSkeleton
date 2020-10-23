import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";
import unicornbikeImg from "./../assets/images/bike.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography variant="h6" className={classes.title}>
        Home Page
      </Typography>

      <CardMedia
        className={classes.media}
        image={unicornbikeImg}
        title="Unicorn Bicycle"
      />

      <CardContent>
        <Typography variant="body2" component="p">
          Welcome to the Social Media home page.
        </Typography>
      </CardContent>
    </Card>
  );
}
