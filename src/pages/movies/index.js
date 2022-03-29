import "../../utils/style/styleListeFilms.css";
import { useSelector, useStore, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { selectMovies } from "../../utils/selectors";
import {
  fetchOrUpdateMovies,
  getCategorie,
  avancePagination,
  reculePagination,
  selectPageBy,
} from "../../caracteristiques/movies";
import Categories from "../../components/Categories/Categories";
import Film from "../../components/Film";
import { Button, Form } from "react-bootstrap";
import Spinner from "../../components/Spinner/Spinner";
import Banniere from "../../components/Banniere";

function Movies() {
  // on utilise le hooks useDispatch dans notre composant
  // pour récupérer la fonction dispatch de redux
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const store = useStore();

  useEffect(() => {
    fetchOrUpdateMovies(store);
  }, [store]);

  const movies = useSelector(selectMovies);

  useEffect(() => {
    //console.log(movies.categExiste);
    if (
      !movies.categExiste ||
      categories.length === 0 ||
      (!movies.categories.includes(activeCategory.trim()) &&
        activeCategory.trim().length > 0)
    ) {
      setCategories(movies.categories);
      setActiveCategory("");
    }
  }, [activeCategory, movies, categories]);

  const pageBy = (e) => {
    dispatch(selectPageBy(store, e.target.value));
  };

  const selectCategory = useCallback(
    (value) => {
      setCategories(categories);
      setActiveCategory(value);
      dispatch(getCategorie(store, value));
    },
    [store, categories, dispatch]
  );

  if (movies.status === "rejected") {
    return <span>Il y a un problème</span>;
  }

  return (
    <div className="lmj-films-list">
      <Banniere />
      <br />
      {movies.listeVide ? (
        <div className="text_liste_vide">
          La liste est vide!
          <br />
          Vous les avez tous supprimés ? ou quoi!!! :o
          <br />
          Ok je vous sauve la vie par ce que c'est vous! <br />
          Rechargez la page <br />
          et ils vont réapparaître comme par magie. :D
        </div>
      ) : (
        <div>
          <div className="menu_filtre">
            <div className="elem_menu_filtre">
              <Categories
                selectCategory={selectCategory}
                categories={categories}
              />
            </div>
            <div className="elem_menu_filtre" style={{ marginLeft: "50px" }}>
              <Form>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Pagination :{" "}
                </Form.Label>
                <Form.Select className="style_select" onChange={pageBy}>
                  <option value="4">Par: 4</option>
                  <option value="8">Par: 8</option>
                  <option value="12">Par: 12</option>
                </Form.Select>
              </Form>
            </div>
          </div>
          {movies.status !== "resolved" ? (
            <Spinner />
          ) : (
            <div>
              <ul className="lmj-film-list">
                {movies.data.map((movie) => (
                  <div key={movie.id}>
                    <Film
                      cover={"films/" + movie.id + ".jpg"}
                      title={movie.title}
                      likes={movie.likes}
                      dislikes={movie.dislikes}
                      movieId={movie.id}
                      categ={movie.category}
                      jaimeLike={movies.likes}
                      jaimepasLike={movies.dislikes}
                    />
                  </div>
                ))}
              </ul>
            </div>
          )}
          <div className="les_boutons_page">
            <span>
              {movies.nbrPage.map((p) => (
                <span
                  style={{
                    color: p.num + 1 === movies.numPage ? "blue" : "skyblue",
                  }}
                  className="numpage"
                  key={p.num}
                >
                  {p.num + 1}
                </span>
              ))}
            </span>
            <br />
            <br />
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => {
                if (movies.currentPage > 0)
                  dispatch(
                    reculePagination(store, movies.currentPage - movies.pageBy)
                  );
              }}
            >
              Précédent
            </Button>

            <Button
              onClick={() => {
                if (movies.pageSuivanteExiste)
                  dispatch(
                    avancePagination(store, movies.currentPage + movies.pageBy)
                  );
              }}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
