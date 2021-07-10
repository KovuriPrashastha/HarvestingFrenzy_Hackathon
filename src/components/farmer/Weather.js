import React, { useEffect, useState } from "react";
import FarmerNav from "./FarmerNav";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  TextField,
  Paper,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toUpper } from "lodash";
import { db } from "../../Firebase";
import firebase from "firebase"
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { AddCircle, Delete, DoneAll } from "@material-ui/icons";
import TaskComp from "./TaskComp";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#30b55b",
  },
}));


function Weather({ farmer, setFarmer }) {

  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = useStyles();
  const [weather, setWeather] = useState({});
  const [input, setInput] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=f2d50b697f0c54b8a0089f29f0c2e66b&unit=standard`;

  const search = (evt) => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
      });
  };
  function Upload(){

    db.collection("farmerData").doc(firebase.auth().currentUser.uid).collection("ToDo").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      dateTime: selectedDate,
      task : task,

    })
  }

  function Delete({id}){

    db.collection("farmerData").doc(firebase.auth().currentUser.uid).collection("ToDo").doc(id).delete()
  }

  useEffect(() => {
    db.collection("farmerData").doc(firebase.auth().currentUser.uid).collection("ToDo")
      .orderBy("dateTime")
      .onSnapshot((snapshot) => {
        setTasks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            item: doc.data(),
          }))
        );
      });
  }, []);

  const Message = {
    Thunderstorm1:
      "watch out harvesters..moderate thunderstorm with light drizzle happening or likely... ",
    Thunderstorm2:
      "heyy harvesters...conditions favorable :) low chance of a thunderstorm... ",
    Thunderstorm:
      " Take Action! harevester.. high chance of thunderstorm with heavy rain...",
    Drizzle: "advisory!..chance of drizzle... ",
    Drizzle2:
      "keep a watch farmer.. chances of heavy intensity drizzle rain... ",
    Drizzle3: "no worries farmer...conditions favorable :)..",
    Rain1: "warning!!..hey harvesters do not delay!!..extreme rain occuring...",
    Rain2: " be aware farmer..moderate rains expected within hours.. ",
    Rain: "heads up harvesters likely..high chances of freezing rains.. ",
    Rain4: " advisory! conditions under control..farmer:) ",
    Snow1:
      " Be aware harvesters and monitor for warnings! due to no chance of snowfall.. ",
    Snow:
      "advisory! farmers..have a plan of action.. expecting rain and snow... ",
    Snow3: " happy farming :) conditions favorable.. ",
    Tornado: "pay attention harvesters..high chance of tornado possible.. ",
    Mist:
      "heyy farmer.. Misty Out here Its chilling too, wear something warm..",
    Haze: "advisory! no action required.. conditons favorable ..",
    Ash: "watch out! farmers ...chance of volcanic ash happening or likely... ",
    Fog: "harvesters.. Its Foggy out there... ",
    Clouds: "Happy farming :) Harvesters sighhh... Cloudy sky today...",
  };

  return (
    <div>
      <FarmerNav farmer={farmer} setFarmer={setFarmer} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          autoComplete="off"
          id="standard-basic"
          label="Your Location"
          required
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
          onClick={() => {
            search();
          }}
        >
          Search
        </Button>
      </div>
      {typeof weather.main != "undefined" ? (
        <div>
          <Card style={{ margin: "auto", maxWidth: 600, textAlign: "center" }}>
            <img
              style={{ width: 200 }}
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {weather.name}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                {weather.weather[0].main}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Our Api Indicates {weather.weather[0].description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Temperature : {Math.round(weather.main.temp)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Wind Speed : {Math.round(weather.wind.speed)}, Deg :
                {Math.round(weather.wind.deg)}
              </Typography>
              <Typography>{Math.round(weather.clouds.all)} % Cloudy</Typography>
              <Typography variant="body2" component="p">
                {toUpper(Message[weather.weather[0].main])}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ) : null}
      <center>
      <h4 style={{ marginTop:20, marginBottom:10}} >
        Note Down Your Plans
      </h4>
      </center>
      <Paper style={{width:300,display:"flex", flexDirection:"column", padding: 20 ,marginLeft:"auto", marginRight:"auto"}}>
      <TextField
            // className='form___field'
            id='standard-basic'
            label='Task'
            type='text'
            value={task}
            fullWidth="true"
            style={{marginBottom:10}}
            onChange={(e) => setTask(e.target.value)}
          />

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
     
    
      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label="Date & Time"
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        disablePast
        format="yyyy/MM/dd HH:mm"
      /></MuiPickersUtilsProvider>
        <IconButton onClick={()=>{
        Upload()
      }}>
        <AddCircle/>
      </IconButton>
      </Paper>
      {tasks.map(({item,id})=>{
                return <TaskComp item={item} id={id} />
            })}

    </div>
  );
}

export default Weather;
