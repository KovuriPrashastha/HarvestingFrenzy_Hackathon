import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'

function Chat() {
    // useEffect(() => {
    //     db.collection("Chats")
    //     .where("cId" , "==" , firebase.auth().currentUser.uid )
    //       .orderBy("timestamp", "desc")
    //       .limit(6)
    //       .onSnapshot((snapshot) => {
    //         setAllChats(
    //           snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             post: doc.data(),
    //           }))
    //         );
    //       });
    //     console.log(posts);
    //   }, []);
    return (
        <div>
            <Grid container>
                <Grid item>this </Grid>
                <Grid item>test </Grid>
                 </Grid>
        </div>
    )
}

export default Chat
