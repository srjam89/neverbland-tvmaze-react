import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import ScheduleItem from "./scheduleItem";

export default function ScheduleItems(props) {
  const scheduleItems = props.schedule.map((item) => {
    return (
      <Grid xs={6} md={3} key={item.id}>
        <ScheduleItem item={item} />
      </Grid>
    );
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {scheduleItems}
      </Grid>
    </Box>
  );
}
