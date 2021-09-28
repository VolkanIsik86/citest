import logo from './logo.svg';
import './App.css';
import {
    Accordion, AccordionDetails, AccordionSummary,
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    Paper,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Route, Router, Switch, withRouter} from "react-router-dom";
import GiraffeStore from "./stores/GiraffeStore";
import {observer} from "mobx-react-lite";
import * as PropTypes from "prop-types";
import PersonStore from "./stores/PersonStore";
import PersonStore2 from "./stores/PersonStore2";
import CourseStore from "./stores/CourseStore";


const giraffeStore = new GiraffeStore();
const personStore = new PersonStore();
const courseStore = new CourseStore();
const personStore2 = new PersonStore2()
function App() {
  return (<>

    <Switch>
        <Route path={"/about"} component={About}/>
        <Route path={"/about/:text"} component={About}/>
        <Route path={"/giraffe"} component={Giraffe}/>
        <Route path={"/person"} component={Person}/>
        <Route path={"/person2"} component={Person2}/>
        <Route path={"/courses"} component={Course}/>
        <Route exact path={"/"} render={()=><h1>Startside</h1>}/>
        <Route render={()=><h1>404</h1>}/>
    </Switch>
      </>

);
}

const About = withRouter(observer(({history,match})=>{
    console.log(history);
    console.log(match);
    return <div><h1>About {match.params.text}</h1>
        <Button variant="contained" onClick={()=>history.push("/")}>Go to front</Button>
    </div>
}));

function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};
const Person = withRouter(observer(({history,match})=>{
    console.log(history);
    console.log(match);
    return <div>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <ul>
                    {personStore.persons.map((person,key)=>
                        <li key={key}>
                            {person.name} <br/>
                            </li>
                    )}
                    </ul>
                </Grid>
            </Grid>
        </Box>
    </div>
}));

const Person2 = withRouter(observer(({history,match})=>{
    console.log(history);
    console.log(match);
    return <div>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <ul>
                        {personStore2.persons.map((person,key)=>
                            <li key={key}>
                                {person.name}
                                {console.log(person)}
                            </li>

                        )}

                    </ul>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" /> <br/>
                    <Button onClick={push} variant="contained">Contained</Button>
                </Grid>
            </Grid>
        </Box>
    </div>
}));

const Course = withRouter(observer(({history,match})=>{
    console.log(history);
    console.log(match);
    return (
        <div>

            {courseStore.courses.map((course,key)=>
                <Accordion key={key}>
                <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>{course.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Responsible {course.Responsible}<br/>
                    <img
                        src={`${course.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${course.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={course.id}
                        loading="lazy"
                        width={"200"}
                    />
                </Typography>
                </AccordionDetails>
                </Accordion>
            )}

        </div>
    )
}));

function push() {

    const person = {
        name: document.getElementById("outlined-basic").value,
        email: "test1@live.dk"
    };

    console.log(person);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify(person);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/addperson", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            personStore2.fetchPersons();

        })
        .catch(error => console.log('error', error));
}


const Giraffe = withRouter(observer(({history,match})=>{
    console.log(history);
    console.log(match);
    return <div>
        <ul>
            {giraffeStore.giraffes.map((giraffeName,key)=>
                <li key={key}>{giraffeName}</li>
            )}
        </ul>
        <Button variant="contained" onClick={()=>giraffeStore.giraffes.push("Jan")}>Add Giraffe</Button>

    </div>
}));
export default observer(App);
