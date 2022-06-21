import common from "./common";

let favourite = {};

favourite.getFavourites = function () {
  return JSON.parse(window.localStorage.getItem(common.STORAGE_NAME) || '[]');
};

favourite.setFavourites = function (movieArray) {
  window.localStorage.setItem(common.STORAGE_NAME, JSON.stringify(movieArray));
};

favourite.isFavourite = function (movieId) {
  const favouriteStorage = this.getFavourites();
  const isFavourite = favouriteStorage.some((movie) => {
    return movie.id === movieId;
  });
  
  return isFavourite;
};

favourite.addToFavourite = function (movie) {
  if (this.isFavourite()) return false;

  const favouriteStorage = this.getFavourites(); 

  favouriteStorage.push(movie);

  this.setFavourites(favouriteStorage);
};

favourite.removeFromFavourites = function (movieId) {
  const favouriteStorage = this.getFavourites();
  const newFavouriteStorage = favouriteStorage.filter((movie) => {
    return movie.id !== movieId;
  });

  this.setFavourites(newFavouriteStorage);
};

export default favourite;