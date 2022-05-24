import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function ListComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [type, setType] = useState("");
  const [languages, setLang] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescrip] = useState("");
  const [minDown, setMinDown] = useState("");
  const [minUp, setMinUp] = useState("");
  const [bookShelf, setBookSh] = useState("");
  const [resource, setRes] = useState("");

  const [agnType, setAgnType] = useState("");
  const [agnName, setAgnName] = useState("");
  const [agnAlias, setAgnalias] = useState("");
  const [agnWeb, setAgnWeb] = useState("");
  const [agnDobmin, setAgnDobMin] = useState("");
  const [agnDobmax, setAgnDobMax] = useState("");
  const [agnDodmin, setAgnDodmin] = useState("");
  const [agnDodmax, setAgnDodmax] = useState("");

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    setLoading(true);
    axios
      .get("https://gnikdroy.pythonanywhere.com/api/book/")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(err?.message);
      });
  };

  const filter = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('done')
    axios
      .get(
        `
        https://gnikdroy.pythonanywhere.com/api/book/?type=${type}&languages=${languages}&title_contains=${title}&description_contains=${description}&downloads_range_min=${minDown}&downloads_range_max=${minUp}&has_bookshelf=${bookShelf}&has_resource_type=${resource}&has_agent_type=${agnType}&agent_name_contains=${agnName}&agent_alias_contains=${agnAlias}&agent_webpage_contains=${agnWeb}&agent_birth_date_range_min=${agnDobmin}&agent_birth_date_range_max=${agnDobmax}&agent_death_date_range_min=${agnDodmin}&agent_death_date_range_max=${agnDodmax}      `
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(err?.message);
      });
  };

  const search = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://gnikdroy.pythonanywhere.com/api/book/?search=${searchQuery}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(err?.message);
      });
  };

  const next_url = (e, url) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(err?.message);
      });
  };

  const previ = (e, url) => {
 console.log('fdf', url)
    e.preventDefault();
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(err?.message);
      });
  };

  const titleAscd = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`https://gnikdroy.pythonanywhere.com/api/book/?ordering=title`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(err?.message);
      });
  };

  const titleDscd = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`https://gnikdroy.pythonanywhere.com/api/book/?ordering=-title`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(err?.message);
      });
  };

  const downloadsAscd = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`https://gnikdroy.pythonanywhere.com/api/book/?ordering=downloads`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(err?.message);
      });
  };

  const downloadDscd = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`https://gnikdroy.pythonanywhere.com/api/book/?ordering=-downloads`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(err?.message);
      });
  };


  return (
    <React.Fragment>
      {error && (
        <Alert
          severity="error"
          sx={{ width: { xs: "70%" }, my: "1em", m: "auto" }}
        >
          Books Not Loaded, Try Again!
        </Alert>
      )}
      <Typography
        sx={{
          color: "primary.main",
          textAlign: "center",
          fontSize: { xs: "1.5em", sm: "2.5em" },
        }}
      >
        Book List
      </Typography>

      <Box
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "70%",
          m: "auto",
        }}
        onSubmit={search}
      >
        <TextField
          type="search"
          focused
          color="primary"
          size="small"
          fullwidth
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Type Here To Search ... `}
          sx={{
            width: { xs: "100%", sm: "70%" },
            my: "1em",
            color: "#000",
            ml: 1,
            flex: 1,
          }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>

      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button onClick={titleAscd}>
          Title <ArrowDropUpIcon sx={{ fontSize: "1.5em" }} />
        </Button>
        <Button onClick={downloadsAscd}>
          Downloads <ArrowDropUpIcon sx={{ fontSize: "1.5em" }} />
        </Button>
      </ButtonGroup>
      <Box sx={{ my: "0.4em" }} />
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button onClick={titleDscd}>
          Title <ArrowDropDownIcon sx={{ fontSize: "1.5em" }} />
        </Button>
        <Button onClick={downloadDscd}>
          Downloads <ArrowDropDownIcon sx={{ fontSize: "1.5em" }} />
        </Button>
      </ButtonGroup>





      <Box
     sx={{
      width:{xs:'100%', sm:'50%'},
      m:{sm:'auto'},

     }} 
      >
      <Accordion 
      sx={{my:'0.4em'}}
      
      >
        <AccordionSummary
              component={Button}
              color='primary'
              fullWidth
              variant='contained'
        
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filter</Typography>
        </AccordionSummary>
        <AccordionDetails component="form" onSubmit={filter}>
              <TextField
                id="outlined-error"
                fullWidth
                label="Type"
                size="small"
                margin="normal"
                focused
                type="text"
                onChange={(e) => setType(e.target.value)}
              />{" "}
              <TextField
                label="Languages"
                type="text"
                fullWidth
                margin="normal"
                size="small"
                focused
                onChange={(e) => setLang(e.target.value)}
              />
              <TextField
                id="outlined-error"
                fullWidth
                label="Title contains"
                size="small"
                type="text"
                margin="normal"
                focused
                onChange={(e) => setTitle(e.target.value)}
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                label="Description contains"
                size="small"
                type="text"
                margin="normal"
                focused
                onChange={(e) => setDescrip(e.target.value)}
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                label="Downloads is in range Min"
                size="small"
                type="number"
                margin="normal"
                focused
                onChange={(e) => setMinDown(e.target.value)}
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                label="Downloads is in range Max"
                size="small"
                margin="normal"
                type="number"
                onChange={(e) => setMinUp(e.target.value)}
                focused
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                margin="normal"
                label="Bookshelves name"
                size="small"
                type="text"
                onChange={(e) => setBookSh(e.target.value)}
                focused
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                margin="normal"
                label="Resources type"
                onChange={(e) => setRes(e.target.value)}
                type="text"
                size="small"
                focused
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                margin="normal"
                label="Agent type"
                size="small"
                focused
                type="text"
                onChange={(e) => setAgnType(e.target.value)}
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                margin="normal"
                label="Agent person name contains"
                size="small"
                type="text"
                onChange={(e) => setAgnName(e.target.value)}
                focused
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                margin="normal"
                label="Agent person alias contains"
                size="small"
                type="text"
                onChange={(e) => setAgnalias(e.target.value)}
                focused
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                margin="normal"
                label="Agent person webpage contains"
                size="small"
                focused
                type="text"
                onChange={(e) => setAgnWeb(e.target.value)}
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                margin="normal"
                label="Agent person birth date is in range Min"
                size="small"
                focused
                type="number"
                onChange={(e) => setAgnDobMin(e.target.value)}
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                margin="normal"
                label="Agent person birth date is in range Max"
                size="small"
                focused
                type="number"
                onChange={(e) => setAgnDobMax(e.target.value)}
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                margin="normal"
                label="Agent person death date is in range Min"
                size="small"
                focused
                type="number"
                onChange={(e) => setAgnDodmin(e.target.value)}
              />{" "}
              <TextField
                id="outlined-error"
                fullWidth
                label="Agent person death date is in range Max"
                size="small"
                focused
                margin='normal'
                type="number"
                onChange={(e) => setAgnDodmax(e.target.value)}
              />{" "}
              <Button
                size="small"
                type="submit"
                fullwidth
                color="primary"
                sx={{ mt: "0.5em", width: "100%" }}
                variant="contained"
              >
                Search
              </Button>
        </AccordionDetails>
      </Accordion>

        
      </Box>

      <Typography sx={{ textAlign: "center", mt: "1em" }}>
        {loading && <CircularProgress />}
      </Typography>
      {data?.results?.map((book) => (
        <Box key={book?.id}>
          <Card
            sx={{
              xs: "100%",
              sm: "70%",
              border: "2px solid grey",
              mx: "0.5em",
              my: "1em",
            }}
            elevation={3}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{ color: "info.dark" }}
                component="div"
              >
                {book?.title}
              </Typography>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Downloads:{" "}
                <Box component="span" sx={{ color: "warning.light" }}>
                  {book?.downloads}
                </Box>
              </Typography>

              <Typography sx={{ mb: 1.5 }}>
                Type:{" "}
                <Box component="span" sx={{ color: "success.light" }}>
                  {book?.type}
                </Box>
              </Typography>

              <Typography variant="body2">
                Description:
                <Box
                  component="a"
                  href={book?.description}
                  sx={{ color: "primary.light" }}
                >
                  Read Description
                </Box>
                <br />
                <Box sx={{ mt: "0.2em" }} />
                Languages <br />
                {book?.languages.map((ln) => (
                  <Box
                    key={ln?.id}
                    sx={{ textTransform: "capitalize", color: "info.main" }}
                  >
                    {" "}
                    {ln}{" "}
                  </Box>
                ))}{" "}
              </Typography>
              <Typography variant="body2" sx={{ mt: "0.2em" }}>
                Subjects <br />
                {book?.subjects.map((sb) => (
                  <Box
                    component="span"
                    sx={{ color: "warning.light" }}
                    key={sb?.id}
                  >
                    {sb}{" "}
                  </Box>
                ))}
                <br />
                <Box sx={{ mt: "0.2em" }} />
                Shelfs: <br />
                {book?.bookshelves.map((bsk) => (
                  <Box
                    component="span"
                    sx={{ color: "success.light" }}
                    key={bsk?.id}
                  >
                    {bsk} |
                  </Box>
                ))}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to={`/${book?.id}/`}
                sx={{ m: "auto" }}
                size="small"
              >
                View Book
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}

      <Box sx={{ display: "flex", my: "1em" }}>
        <Button
          sx={{ marginRight: "auto", display: data?.previous ? '': 'none' }}
          onClick={(e) => previ(e, data?.previous)}
        >
          <ArrowBackIosIcon />
          prev
        </Button>
        <Button onClick={(e) => next_url(e, data?.next)}
         sx={{
           marginLeft:'auto',
           display: data?.next ? '' : 'none'
         }}
        >
          next
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </React.Fragment>
  );
}
