import { Button, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React,{useEffect,useState} from 'react'
import { fire ,db} from '../../Firebase';

function Admin(props) {
    const [report, setReport] = useState([]);
    const [fPhone, setFPhone] = useState([]);

    useEffect(() => {
        db.collection("Report")
          .onSnapshot((snapshot) => {
            setReport(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          });
      
      }, []);

    return (
        <div>
            <center>
                <h4>ADMIN REPORTS</h4>
            </center>
            <Button onClick={()=>{
                    fire.auth().signOut();
                    props.setAdmin(false);
            }}>
LOGOUT
            </Button>
            <center>
            <div>{report.map(({id, data})=>{
                return <div style={{display:"flex", flexDirection:"column", maxWidth:600, width: "90%"}}><TableContainer component={Paper} style={{marginBottom:10}}>
                 <Typography variant="overline">
                        {data.orderId}
                    </Typography>
                <Table aria-label="simple table">
                   
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer Name</TableCell>
                      <TableCell align="left">{data.cName}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  <TableRow>
                  <TableCell>Reported On</TableCell>
                      <TableCell align="left">
                          <Typography>{data.fName}</Typography>
                      
                          <Typography variant="overline">{data.fId}</Typography>
                           </TableCell>
                    
                    </TableRow>
                    <TableRow>
                  <TableCell>Issue</TableCell>
               
                    <TableCell>{data.content}</TableCell>
                      
                    </TableRow>

                  <TableRow>
                          
                      <TableCell>
                      <Button onClick={()=>{
                               db.collection("farmerData").doc(data.fId).get().then((doc)=>{
                                   setFPhone(doc.data().phone)
                               })

                           }}>
                               Show Farmer Phone Number
                           </Button>
                      </TableCell>
                      <TableCell>
                    {fPhone}
                      </TableCell>


                    </TableRow>


                  </TableBody>
                </Table>
              </TableContainer>
              </div>
            })}</div></center>
        </div>
    )
}

export default Admin
