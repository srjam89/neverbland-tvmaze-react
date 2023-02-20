import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useParams } from "react-router-dom";
import tvmaze from "../API/tvmaze";
import showCSS from "../styles/showItem.module.css";
import { Container } from "@mui/system";
import Rating from "@mui/material/Rating";

const ShowItem = (props) => {
  const [show, setShow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const getShowInfo = (id) => {
    tvmaze(`shows/${id}`).then((res) => {
      res.json().then((data) => {
        setShow(data);
        setIsLoading(false);
        setIsLoaded(true);
      });
    });
  };
  const { id } = useParams();

  useEffect(() => {
    getShowInfo(id);
  }, [id]);

  if (isLoading && !isLoaded) {
    return <div>Loading...</div>;
  }

  const { image, summary, rating, network, schedule } = show;
  const keys = !(image == null) ? Object.keys(image) : [];
  const imageUrl = keys.includes("medium")
    ? image.medium
    : "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6-300x188.png";

  let originalStr = summary;
  let strippedStr = originalStr.replace(/(<([^>]+)>)/gi, "");

  const starRating = rating.average;
  const genreArray = show.genres.length === 0 ? show.type : show.genres[0];

  const networkName = network === null ? show.webChannel.name : network.name;

  const scheduleInfo =
    schedule === null
      ? ""
      : schedule.time.length > 0
      ? schedule.time
      : schedule.days.join(", ");

  return (
    <div>
      <div role="presentation" className={showCSS.breadcrumb}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            HomePage
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="./showItem.js"
            aria-current="page"
          >
            Show
          </Link>
        </Breadcrumbs>
      </div>
      <Container maxWidth="lg">
        <div className={showCSS.posterContainer}>
          <img
            src={imageUrl}
            className={showCSS.poster}
            alt="poster of tv show"
          />
          <div className={showCSS.overview}>
            <Rating name="read-only" value={starRating} readOnly />
            <h1 className={showCSS.title}>{show.name}</h1>
            <p className={showCSS.summaryText}>{strippedStr}</p>
          </div>
        </div>
        <section>
          <aside className={showCSS.showInfo}>
            <h2>Show Info</h2>
            <div className={showCSS.moreInfo}>
              <p className={showCSS.category}>Streamed on</p>
              <p className={showCSS.result}>{networkName}</p>
            </div>
            <hr></hr>
            <div className={showCSS.moreInfo}>
              <p className={showCSS.category}>Schedule</p>
              <p className={showCSS.result}>{scheduleInfo}</p>
            </div>
            <hr></hr>
            <div className={showCSS.moreInfo}>
              <p className={showCSS.category}>Status</p>
              <p className={showCSS.result}>{show.status}</p>
            </div>
            <hr></hr>
            <div className={showCSS.moreInfo}>
              <p className={showCSS.category}>Genres</p>
              <p className={showCSS.result}>{genreArray}</p>
            </div>
          </aside>
        </section>
      </Container>
    </div>
  );
};

export default ShowItem;
