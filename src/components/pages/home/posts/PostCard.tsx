import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

interface Props {
  post: Post;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      height: '100%',
      margin: 'auto',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      backdropFilter: 'blur(8.5px)',
    },
    media: {
      height: 0,
      paddingTop: "56.25%"
    },
    expand: {
      marginLeft: "auto"
    },
    cardHeader: {
      height: '20%',
      color: '#333333'
    },
    cardAction:{
      marginLeft: '70%',
      color: 'rgb(114 137 198 / 1)',
    }
  })
);

export default function PostCard(props: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        titleTypographyProps={{variant:'subtitle1' }}
        title={props.post.title.length < 63 ? props.post.title : `${props.post.title.substring(0,63)}...`}
      />
      <CardMedia
        className={classes.media}
        image={props.post.linkImage}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${props.post.user?.firstName} ${props.post.user?.lastName}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardAction}>
        <Button
          size='small'
          color="inherit"
          component={NavLink}
          to={`/post/${props.post.id}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
