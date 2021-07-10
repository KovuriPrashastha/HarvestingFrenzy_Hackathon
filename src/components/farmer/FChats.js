
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider, Grid, IconButton, Paper, TextField, Typography } from '@material-ui/core'
import {db} from "../../Firebase"
import firebase from "firebase"
import { ArrowBack, Chat } from '@material-ui/icons'
import ScrollableFeed from 'react-scrollable-feed'
import Cdp from "../../images/custDp.jpg"
import Fdp from "../../images/farmerDp.jpg"
import FarmerNav from './FarmerNav'

function FChats(props) {
    const [msg, setMsg] = useState("")



    const [allChats, setAllChats] = useState([])
    const [sChat, setSChat] = useState("")
    const [chatCon, setChatCon] = useState(false)
    const [showChat, setShowChat] = useState([])
    let openChat = ""
    function handleMsgSend() {
      db.collection("Chats").doc(sChat).collection("conversation").add({
        sId: firebase.auth().currentUser.uid,
       msg: msg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  
      })
      setMsg("")
      
    }
    useEffect(() => {
        db.collection("Chats")
        .where("fId" , "==" , firebase.auth().currentUser.uid )
          .orderBy("timestamp", "desc")
          .limit(6)
          .onSnapshot((snapshot) => {
            setAllChats(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                chat: doc.data(),
              }))
            );
          });
      }, []);
      function handleChatOpen() {
        setChatCon(true)
        db.collection("Chats").doc(openChat).collection("conversation")
                .orderBy("timestamp")
                .onSnapshot((snapshot) => {
                  setShowChat(
                    snapshot.docs.map((doc) => ({
                      id: doc.id,
                      data: doc.data(),
                    }))
                  );
                });
        
        
      }
    return (
        <div>
         <FarmerNav setFarmer={props.setFarmer} />


        <div>            
          {chatCon ? (
            <center >
              <div style={{width:"95%", height:"85vh" , maxWidth:600 ,borderStyle:"solid"}}>
            
               
              <Paper style={{ height:600}}>
           <ScrollableFeed forceScroll="true" >
  
      
              { showChat.map(({id,data})=>{
                // setCount(count+1)
             if(data.sId === firebase.auth().currentUser.uid) {
               if(data.msg === "Start of conversation") {
                return <center>
                <Typography style={{width : 200,padding:10}}>
                {data.msg}
                </Typography></center>
               } else {
               return <div style={{display:"flex", flexDirection: "row-reverse",padding:5}}>
              <Avatar src={Fdp}/> <Typography align="right" style={{alignSelf: "flex-end",padding:10}}>
               {data.msg}
               </Typography></div>}
             } 
             if(data.sId != firebase.auth().currentUser.uid) {
                if(data.msg === "Start of conversation") {
                 return <center>
                 <Typography style={{width : 200,padding:10}}>
                 {data.msg}
                 </Typography></center>
                } else {
                    return  <div style={{display:"flex", flexDirection: "row",padding: 5}}>
              <Avatar src={Cdp}/>
               <Typography align="left" style={{alignSelf: "flex-start",padding:10}}>
               {data.msg}
               </Typography></div>}
              }
             
          
           })}
           
          
           </ScrollableFeed>
          </Paper>
        
           <div style={{display:"flex" ,justifyContent: "space-around",padding:0 }}>
           <IconButton alignSelf="right" onClick={()=>{setChatCon(false)}} style={{flex:0}}>
                 <ArrowBack size="small"/>
               </IconButton> <TextField size="small"
               style={{flex:1, width:"100%"}}
                                          id="outlined-basic"
                                          label="Type here"
                                          required
                                          type="text"
                                          value={msg}
                                          onChange={(e) => setMsg(e.target.value)}
                                            />
                                              <Button onClick={()=>{
                                                        handleMsgSend()}} style={{flex:0}}>
                                                      Send
                                    </Button>
                                        </div>
                                        </div>
           </center>
  
          ) : (
  
            <div>
              
  {allChats.map(({ id, chat }) => (
  <section>
    <center>
  <a href="#end">
  <Paper onClick={()=>{
    openChat = `${chat.fId}${chat.cId}`
    setSChat(`${chat.fId}${chat.cId}`)
    handleChatOpen()
  }} style={{height: "100%",width: "95%",padding:10,marginTop: 10}}>
      <Typography 
      style={{padding:10}}
      align="left">
      {chat.cName}
      </Typography>
      <Divider/>
      
      </Paper>
      </a>
      </center>
  </section>
  
  ))}
  </div>
          )
  
          }
         
                
      </div>
      </div>
  
      )
}

export default FChats
