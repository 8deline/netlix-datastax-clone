const Card = ({ movie }) => {
  return (
    <div>
      <h4>{movie.title}</h4>
      <h4>{movie.duration}</h4>
      <video className="movies">
        <source src={movie.thumbnail} type="video/mp4" />
      </video>
    </div>
  );
};

export default Card;
