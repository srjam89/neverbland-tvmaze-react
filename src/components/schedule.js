import React, { useEffect, useState } from "react";
import tvmaze from "../API/tvmaze";
import ScheduleItems from "./scheduleItems";
import scheduleCSS from "../styles/schedule.module.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import moment from "moment";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState({});
  const maxPage = 12;
  const getSchedule = () => {
    tvmaze("schedule?country=GB").then((res) => {
      res.json().then((res) => {
        const data = res.map((item) => {
          return {
            ...item,
            start: moment(new Date(item.airstamp)),
            end: moment(new Date(item.airstamp)).add(item.runtime, "minutes"),
          };
        });
        setSchedule(data);
        const now = moment(new Date());
        const current = data.reduce((output, item, index) => {
          const isBetween = now.isBetween(item.start, item.end);
          if (output === null && isBetween) {
            return { index };
          }
          return output;
        }, null);
        setCurrentPage(current);
        setIsLoading(false);
        setIsLoaded(true);
      });
    });
  };

  useEffect(() => {
    getSchedule();
  }, []);

  if (isLoading && !isLoaded) {
    return <div>Loading...</div>;
  }

  const displayItems = schedule.filter((item, index) => {
    return index >= currentPage.index && index < currentPage.index + maxPage;
  });

  const hasPrevious = currentPage.index >= maxPage;
  const hasMore = currentPage.index + maxPage < schedule.length - 1;

  const viewPrevious = () => {
    const index = currentPage.index - maxPage;
    setPage(index);
  };

  const setPage = (pageIndex) => {
    const show = schedule.filter((item, index) => {
      return index === pageIndex;
    });
    if (show.length === 0) {
      return;
    }
    setCurrentPage({ index: pageIndex });
  };

  const viewNext = () => {
    const index = currentPage.index + maxPage;
    setPage(index);
  };

  return (
    <div className={scheduleCSS.container}>
      <div role="presentation" className={scheduleCSS.breadcrumb}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="text.primary"
            href="/"
            aria-current="page"
          >
            HomePage
          </Link>
        </Breadcrumbs>
      </div>
      <Button onClick={viewPrevious} disabled={!hasPrevious}>
        Previous
      </Button>
      <Button onClick={viewNext} disabled={!hasMore}>
        Next
      </Button>
      <ScheduleItems schedule={displayItems} />
      <Button onClick={viewPrevious} disabled={!hasPrevious}>
        Previous
      </Button>
      <Button onClick={viewNext} disabled={!hasMore}>
        Next
      </Button>
      <div className={scheduleCSS.topLink}>
        <p>
          <a href="/">
            Top of Page <KeyboardDoubleArrowUpIcon />
          </a>
        </p>
      </div>
    </div>
  );
};

export default Schedule;
