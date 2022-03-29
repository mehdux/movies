import "../../utils/style/styleFilm.css";
import { useStore, useDispatch } from "react-redux";
import croixrouge from "../../assets/imgs/corbeille.png";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

import { filmSupprime, jaime, jaimepas } from "../../caracteristiques/movies";

function Film({
  cover,
  title,
  likes,
  dislikes,
  movieId,
  categ,
  jaimeLike,
  jaimepasLike,
}) {
  const store = useStore();

  const dispatch = useDispatch();

  function confirmeSupprimeFilm(store, movieId, title) {
    var answer = window.confirm(
      "Voulez-vous supprimer " + title + " de la liste?"
    );
    if (answer) dispatch(filmSupprime(store, movieId));
  }

  function jaimes(store, likes, movieId) {
    dispatch(jaime(store, likes, movieId));
  }

  function jaimespas(store, likes, movieId) {
    dispatch(jaimepas(store, dislikes, movieId));
  }

  return (
    <li className="lmj-film-item">
      <img className="lmj-film-item-cover" src={cover} alt={`${title} cover`} />
      <h3 className="titre_film">{title}</h3>
      <div className="ctn_info_film">
        <div className="fils_info_film">
          <FaThumbsUp
            style={{
              color:
                jaimepasLike.filter((f) => f.id === movieId).length === 1 &&
                jaimepasLike.filter((f) => f.id === movieId)[0].value
                  ? "gray"
                  : jaimeLike.filter((f) => f.id === movieId).length === 1 &&
                    jaimeLike.filter((f) => f.id === movieId)[0].value
                  ? "red"
                  : "black",
            }}
            onClick={() => {
              if (
                !(
                  jaimepasLike.filter((f) => f.id === movieId).length === 1 &&
                  jaimepasLike.filter((f) => f.id === movieId)[0].value
                )
              )
                jaimes(store, likes, movieId);
            }}
            className="like_film"
          />
          <span className="nbr_like_film">{likes}</span>
        </div>
        <div className="fils_info_film">
          <FaThumbsDown
            className="like_film"
            style={{
              color:
                jaimeLike.filter((f) => f.id === movieId).length === 1 &&
                jaimeLike.filter((f) => f.id === movieId)[0].value
                  ? "gray"
                  : jaimepasLike.filter((f) => f.id === movieId).length === 1 &&
                    jaimepasLike.filter((f) => f.id === movieId)[0].value
                  ? "red"
                  : "black",
            }}
            onClick={() => {
              if (
                !(
                  jaimeLike.filter((f) => f.id === movieId).length === 1 &&
                  jaimeLike.filter((f) => f.id === movieId)[0].value
                )
              )
                jaimespas(store, dislikes, movieId);
            }}
          />
          <span className="nbr_like_film">{dislikes}</span>
        </div>
        <div className="fils_info_film">
          <img
            onClick={() => {
              confirmeSupprimeFilm(store, movieId, title);
            }}
            src={croixrouge}
            className="supprime_film"
            alt={`${title}`}
          />
        </div>
      </div>
      <div className="info_categ">
        <span className="label_categ">Catégorie : </span>
        <span className="categ">{categ}</span>
      </div>
    </li>
  );
}

export default Film;
