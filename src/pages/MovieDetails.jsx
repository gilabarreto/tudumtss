import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-semibold">🎞️ Movie Details.</h1>
      <p>Movie ID: {id}</p>
    </div>
  );
}
export default MovieDetails;
