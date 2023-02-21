import React from "react";
import moment from "moment";
import styles from "../styles/navigation.module.css";

const Navigation = () => {
  const date = moment(new Date());
  const dateString = date.format("ddd MMM Do YYYY hh:mm A");
  const shortDate = date.format("DD/MM/YYYY HH:mm");
  return (
    <div className={styles.nav}>
      <h1 id="top-page-link">TVSchedule</h1>
      <p className={styles.date}>{dateString}</p>
      <p className={styles.shortDate}>{shortDate}</p>
    </div>
  );
};

export default Navigation;
