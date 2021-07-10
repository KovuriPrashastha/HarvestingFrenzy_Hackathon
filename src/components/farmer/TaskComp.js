import { Card, IconButton, Typography } from '@material-ui/core'
import { DoneAll, Star } from '@material-ui/icons'
import React from 'react'
import { db } from '../../Firebase'
import firebase from "firebase"

function TaskComp({id,item}) {
    function Delete(){

        db.collection("farmerData").doc(firebase.auth().currentUser.uid).collection("ToDo").doc(id).delete()
      }
    return (
        <Card style={{display:"flex", width:"90%", maxWidth:600,padding:10,justifyContent:"space-around", marginTop:10,marginLeft:"auto", marginRight:"auto"}}>
              
                <div><Typography align="left" component="h7" variant="overline">{item.dateTime.toDate().toString()}</Typography>

                     <Typography align="left" component="h6">{item.task}</Typography>
            </div>
            <IconButton onClick={()=>{
        Delete(id)
      }}>

        <DoneAll/>
      </IconButton>
            
            
                </Card>
       
    )
}

export default TaskComp
