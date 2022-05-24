import React from 'react'
import { Route, Switch,  BrowserRouter as Router} from "react-router-dom";
import ListBooks from './Components/ListComponent'
import DetailBooks from './Components/Detail'
import Box from '@mui/material/Box';



const BaseRouter = () => (
    <Box  sx={{p:'0.3em'}} >
        <Router>
        <Switch>
            <Route exact path='/' component={ListBooks} />
            <Route exact path='/:id/' component={DetailBooks} />
        </Switch>
        </Router>
    </Box>
)

export default BaseRouter

