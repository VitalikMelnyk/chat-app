import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@material-ui/core";
import AOS from "aos";
import { useStyles } from "./styles";
import image from "../../assets/hero.png";

const HomePage = () => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init();
  });
  return (
    <section>
      <Grid container className={classes.root}>
        <Grid item xs data-aos="zoom-in-right" data-aos-duration="1000">
          <Card className={classes.cardItem} elevation={0}>
            <CardContent className={classes.homeDescription}>
              <Typography gutterBottom variant="h2" component="h2">
                <Typography component="span" variant="h2" color="secondary">
                  ChatApp{" "}
                </Typography>{" "}
                for Everyone
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                className={classes.homeBtn}
                size="large"
                color="secondary"
                variant="contained"
              >
                Chat Now
              </Button>
              <Button
                className={classes.homeBtn}
                size="large"
                color="primary"
                variant="contained"
              >
                Sign Up
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs data-aos="zoom-in-left" data-aos-duration="1000">
          <Card className={classes.cardItem} elevation={0}>
            <CardMedia
              className={classes.homeImage}
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={image}
              title="Contemplative Reptile"
            />
          </Card>
        </Grid>
      </Grid>
    </section>
  );
};

export default HomePage;
