import { Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import ReactStars from "react-rating-stars-component";

function Rating(props) {
const [rating, setRating] = useState([])
    useEffect(() => {
        db.collection("farmerData").doc(props.fid).collection("rating")
        //   .orderBy("timestamp", "desc")
        //   .limit(6)
          .onSnapshot((snapshot) => {
            setRating(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          });
    
      
      }, []);
    return (
        <div>
             {rating.map(({ id, data }) => (
       <Paper style={{padding:10}}>
           <Typography>
                {data.cName}
           </Typography>
           <ReactStars
    count={data.stars}
 
    size={24}
    activeColor="#ffd700"
  />
           <Typography>
                {data.content}
           </Typography>
     
       </Paper>
      ))}
        </div>
    )
}

export default Rating
