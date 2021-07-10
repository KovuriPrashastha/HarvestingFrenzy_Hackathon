import { Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Fade, Grid, Grow, makeStyles, Paper, Typography } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import React, { useState } from 'react'
import Test from "../../images/test.png"
import Test2 from "../../images/test2.jpg"
import "./blog.css"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,

    },

    img: {
      display: 'block',
      maxWidth: 300,
      width:"100%",
    },
  }));

function Blog(props) {
  function LoadContent() {
    if (readMore === true) {
      return (
        <div>
      <Typography align="left">
{props.content}    
          </Typography>
        </div>
      );
    } else {
      return null;
    }
  }
  function CardParameter() {
    if (readMore === true) {
      setHeight("100%")
    } else {
    setHeight(300)
  }

    }

  const [readMore, setReadMore] = useState(false)
  const [height, setHeight] = useState(300)

    const classes = useStyles();
    return (
      
        <div style={{marginLeft:"auto",marginRight:"auto"}}>
              <Grow
          in="true"
          style={{ transformOrigin: '0 0 0',
          timeout: 1000
        
        }}
        >
              <Card style={{ height: {height}, position: "relative" ,maxWidth:800 , width:"95%",marginBottom:10 }}>
        {readMore ? (
        <CardMedia className="DesktopMobileOpen" image={props.imgUrl} />

        ) :(
        <CardMedia className="DesktopMobile"  image={props.imgUrl} />

        ) }

        <CardContent>
     <Typography variant="h6" align="left"> 
{props.title}
     </Typography>
     <Typography variant="subtitle2" align="left"> 
{props.userName}
     </Typography>
     <div>{LoadContent()}</div>

        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {readMore ? (
            <Button
              onClick={() => setReadMore(false)}
              startIcon={<ExpandLess />}
            >
              Close
            </Button>
          ) : (
            <Button
              onClick={() => {
                CardParameter()
                setReadMore(true)}}
              startIcon={<ExpandMore />}
            >
              Read More
            </Button>
          )}
        </CardActions>
      </Card>
      </Grow>
        </div>
    )
}

export default Blog
