function Anime({ name, description }) {
  return (
    <div className="anime-item">
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}

export default Anime;
