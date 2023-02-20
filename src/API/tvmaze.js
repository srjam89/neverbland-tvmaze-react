const tvmaze = (action) => {
  return fetch(`https://api.tvmaze.com/${action}`);
};

export default tvmaze;
