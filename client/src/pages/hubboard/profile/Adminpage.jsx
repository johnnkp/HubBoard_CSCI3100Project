import { SettingsRounded } from "@mui/icons-material";
import { Box, Container, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { MainLayout } from "../../../components/Layout";
import SimplePopover from "../../../components/UI/Utils/SimplePopover";

const Adminpage = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const res = await axios.get("/api/admin/getAllUser");
        setUsers(res.data.users);
      } catch (err) {}
    };
    getAllUser();
  }, []);

  return (
    <MainLayout profilepage={true}>
      <Container>
        <List>
          {users &&
            users.map((user) => (
              <ListItem
                key={user._id}
                secondaryAction={
                  <Box>
                    <SimplePopover user={user} />
                  </Box>
                }
              >
                <ListItemText primary={user.username} secondary={user.email} />
              </ListItem>
            ))}
        </List>
      </Container>
    </MainLayout>
  );
};

export default Adminpage;
