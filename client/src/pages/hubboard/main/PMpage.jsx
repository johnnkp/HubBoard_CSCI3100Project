import {MainLayout} from "../../../components/Layout";
import {Box, Button, Grid, List, ListItem, Stack, TextField} from "@mui/material";
import {SendRounded} from "@mui/icons-material";

const PMpage = () => {
  return (
    <MainLayout profilepage={false}>
      <Grid container>
        <Stack width="10vw">
          <h2>Friend List</h2>
          <List>
            <ListItem>test1</ListItem>
            <ListItem>test2</ListItem>
            <ListItem>test3</ListItem>
            <ListItem>test4</ListItem>
            <ListItem>test5</ListItem>
            <ListItem>test6</ListItem>
            <ListItem>test7</ListItem>
            <ListItem>test8</ListItem>
            <ListItem>test9</ListItem>
            <ListItem>test10</ListItem>
          </List>
        </Stack>
        <Stack height="88.3vh" flexDirection="column" justifyContent="flex-end">
          <Grid container width="70vw" flexDirection="row" justifyContent="flex-end">
            <Box width="60vw">
              <TextField fullWidth variant="filled" size="small"/>
            </Box>
            <Button variant="contained" endIcon={<SendRounded/>}>
              Send
            </Button>
          </Grid>
        </Stack>
      </Grid>
    </MainLayout>
  );
};

export default PMpage;
