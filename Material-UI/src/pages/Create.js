import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("money");
  const history=useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }

    if (title && details) {
      fetch('http://localhost:8000/notes',{
        method:'POST',
        headers:{"content-type":"application/json"},
        body:JSON.stringify({title,details,category})
      })
      .then(()=>history.push('/'))
    }
  };

  return (
    <Container>
      <Typography
        className={classes.title}
        variant="h6"
        component="h2"
        gutterbuttom="true"
        color="textSecondary"
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Note title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        ></TextField>

        <TextField
          className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
        ></TextField>

        <FormControl className={classes.field}>
          <FormLabel>Note category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          className={classes.btn}
          type="submit"
          color="secondary"
          variant="contained"
          disableElevation
          endIcon={<ArrowForwardIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
