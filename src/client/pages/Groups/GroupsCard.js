import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { List } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import Box from "@material-ui/core/Box";
import DeleteButton from "../../commons/DeleteButton";

const useStyles = makeStyles((theme) => ({
  title: {
    color: `${theme.palette.text.primary} !important`,
  },
  words: {
    color: `${theme.palette.text.secondary} !important`,
  },
}));

function GroupsCard(props) {
  const classes = useStyles();

  const { chosen, groups } = props;
  const [filter, setFilter] = useState("");
  const [filteredGroups, setGroups] = useState(groups);

  const onGroupClick = (name) => (e) => {
    props.clickGroup(name);
  };

  const onGroupDelete = (name) => (e) => {
    e.stopPropagation();
    props.deleteGroup(name);
  };

  useEffect(() => {
    if (groups) {
      if (filter) {
        const regex = new RegExp(`^${filter}`, "i");
        const filteredGroups = groups.filter((grp) => regex.exec(grp.name));
        setGroups(filteredGroups);
      } else {
        setGroups(groups);
      }
    }
  }, [filter, groups]);

  const filterChange = (e, data) => {
    const regex = /[\w', ]*/;
    if (regex.exec(data.value)) {
      setFilter(data.value);
    }
  };

  return (
    <Card className={props.className}>
      <CardContent>
        <Typography variant="h5">Select a Group</Typography>
        <Input
          value={filter}
          onChange={filterChange}
          icon="search"
          placeholder="Filter Groups..."
        />

        <List divided relaxed selection>
          {filteredGroups.map((group) => (
            <List.Item
              key={group.name}
              active={group.name == chosen}
              onClick={onGroupClick(group.name)}
              className={classes.words}
            >
              <List.Header className={classes.title}>
                <Box display="flex" justifyContent="space-between">
                  {group.name}
                  <DeleteButton onDelete={onGroupDelete(group.name)} />
                </Box>
              </List.Header>
              {group.words.join(", ")}
            </List.Item>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default GroupsCard;
