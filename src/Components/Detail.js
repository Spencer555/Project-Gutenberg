import React, { useState, useEffect } from "react";
import axios from "axios";
import {  Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useParams, Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));




export default function DetailComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const { id } = useParams();
  const [fav, setFav] = React.useState(localStorage.getItem(id));

  console.log(fav, 'r')

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getBooks();
  }, [refresh]);

  
  const getBooks = () => {
    setLoading(true);
    axios
      .get(`https://gnikdroy.pythonanywhere.com/api/book/${id}`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(err?.message);
      });
  };

 const favi = (e, ids) => {
   e.preventDefault()
   if (fav === true){
    localStorage.removeItem(ids)

   }else {
    localStorage.setItem(ids, true)

   }

setFav(!fav)
 }

  return (
    <React.Fragment>
      {error && (
        <Alert
          severity="error"
          sx={{ width: { xs: "70%" }, my: "1em", m: "auto" }}
        >
          Book Not Loaded, Try Again!
        </Alert>
      )}
      <Typography
        sx={{
          color: "primary.main",
          textAlign: "center",
          fontSize: { xs: "1.5em", sm: "2.5em" },
        }}
      >
        Book Detail
      </Typography>


      <Typography sx={{ textAlign: "center", mt: "1em" }}>
        {loading && <CircularProgress />}
      </Typography>
    <Card sx={{ width:{xs:'100%', sm:'60%', lg:'40%'}, m:'auto'}}>
    <CardHeader
      title={data?.title}
      subheader={`Downloads: ${data?.downloads}`}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        <Button component='a' href={data?.description} target='_blank'>
          Read Description
        </Button>
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites" onClick={(e) => favi(e, data?.id)}>
        <FavoriteIcon color={fav ? 'primary' : ''}/>
      </IconButton>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Type: {data?.type}</Typography>
        <Typography paragraph>
            languages <br/>
            {data?.languages?.map((ln) => (
                  <Box
                  component='span'
                    key={ln?.id}
                    sx={{ textTransform: "capitalize", color: "info.main" }}
                  >
                    {" "}
                    {ln}{" "}
                  </Box>
                ))}{" "}

        </Typography>
        <Typography paragraph>
        Shelfs: <br />
                {data?.bookshelves?.map((bsk) => (
                  <Box
                    component="span"
                    sx={{ color: "success.light" }}
                    key={bsk?.id}
                  >
                    {bsk} |
                  </Box>
                ))}
        </Typography>
        <Typography paragraph>
        Subjects <br />
                {data?.subjects?.map((sb) => (
                  <Box
                    component="span"
                    sx={{ color: "warning.light" }}
                    key={sb?.id}
                  >
                    {sb}{" "}
                  </Box>
                ))}
        </Typography>
        <Typography paragraph>
        License: {data?.license}
        </Typography>
        <Typography paragraph>
        Agents: <br />
                {data?.agents?.map((agn) => (
                  <Box
                    component="span"
                    sx={{ color: "success.light" }}
                    key={agn?.id}
                  >
                    {agn?.type} - {agn?.person}
                  </Box>
                ))}
        </Typography>

        <Typography paragraph>
        Read Book: <br />
                {data?.resources?.map((res) => (
                  <Box
                    component="span"
                    sx={{ color: "success.light" }}
                    key={res?.id}
                  >
                    <Button variant='outlined' sx={{m:'0.5em'}} component='a' target="_blank" href={res?.uri}>{res?.type}</Button>
                  </Box>
                ))}
        </Typography>
      </CardContent>
    </Collapse>
  </Card>
     
     <Button component={Link} to={'/'}>Back To Home </Button>
    </React.Fragment>
  );
}
























