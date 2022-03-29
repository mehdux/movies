import produce from "immer";
import { selectMovies } from "../utils/selectors";
import { movies$ } from "../datas/movies";

const initialState = {
  status: "void",
  data: null,
  error: null,
  currentPage: 0,
  listeFilmsSupprimes: [],
  pageSuivanteExiste: false,
  pageBy: 4,
  categories: [],
  laCatgeorie: "",
  likes: [],
  dislikes: [],
  nbrPage: [],
  numPage: 0,
  listeVide: false,
  categExiste: true,
};

const FETCHING = "movies/fetching";
const RESOLVED = "movies/resolved";
const REJECTED = "movies/rejected";
const CURRENTPAGE = "movies/currentPage";
const FILMSSUPPRIMES = "movies/filmssupprimes";
const PAGESUIVANTEEXISTE = "movies/pagesuivanteexiste";
const PAGEBY = "movies/pageby";
const CATEGORIES = "movies/categories";
const LACATEGORIE = "movies/lacategorie";
const LIKES = "movies/likes";
const DISLIKES = "movies/dislikes";
const NBRPAGE = "movies/nbrpage";
const NUMPAGE = "movies/numpage";
const LISTEVIDE = "movies/listevide";
const CATEGEXISTE = "movies/categexiste";

const moviesFetching = () => ({ type: FETCHING });
const moviesResolved = (data) => ({ type: RESOLVED, payload: data });
const moviesRejected = (error) => ({ type: REJECTED, payload: error });
const setCurrentPage = (currentPage) => ({
  type: CURRENTPAGE,
  payload: currentPage,
});

const setFilmsSupprimes = (listeFilmsSupprimes: any[]) => ({
  type: FILMSSUPPRIMES,
  payload: listeFilmsSupprimes,
});

const setPageSuivanteExiste = (pageSuivanteExiste) => ({
  type: PAGESUIVANTEEXISTE,
  payload: pageSuivanteExiste,
});

const setPageBy = (pageBy) => ({
  type: PAGEBY,
  payload: pageBy,
});

const setCategories = (categories) => ({
  type: CATEGORIES,
  payload: categories,
});

const setCategorie = (laCategorie) => ({
  type: LACATEGORIE,
  payload: laCategorie,
});

const setLikes = (likes) => ({
  type: LIKES,
  payload: likes,
});

const setDisLikes = (dislikes) => ({
  type: DISLIKES,
  payload: dislikes,
});

const setNbrPage = (nbrPage) => ({
  type: NBRPAGE,
  payload: nbrPage,
});

const setNumPage = (numPage) => ({
  type: NUMPAGE,
  payload: numPage,
});

const setListeVide = (listeVide) => ({
  type: LISTEVIDE,
  payload: listeVide,
});

const setCategExiste = (categExiste) => ({
  type: CATEGEXISTE,
  payload: categExiste,
});

export const updateCategExiste = (store, donne) => (dispatch) => {
  store.dispatch(setCategExiste(donne));
};

export const jaime = (store, jaimes, idFilm) => (dispatch) => {
  let data = store.getState().movies.data;
  let dataUpdate = [];
  let dataCible = {
    id: null,
    title: null,
    category: null,
    likes: null,
    dislikes: null,
  };
  //on parcours tout les élements de la liste on checkant le film dont veut changes ses likes
  let dataLikes = store.getState().movies.likes;
  let dataLike = {
    id: null,
    value: null,
  };
  let dataLikeCible = {
    id: null,
    value: null,
  };

  //if (dataLikes.length === 0)
  data.forEach((f) => {
    if (!dataLikes.filter((dl) => dl.id === f.id)[0]) {
      dataLike = {
        id: f.id,
        value: false,
      };
      dataLikes = [...dataLikes, dataLike];
    }
  });

  data.forEach((f) => {
    if (f.id === idFilm) {
      dataLikeCible = dataLikes.filter((f) => f.id === idFilm)[0];
      dataLikes = dataLikes.filter((f) => f.id !== idFilm);
      dataLike = {
        id: f.id,
        value: dataLikeCible.value ? false : true,
      };
      dataLikes = [...dataLikes, dataLike];
    }
  });

  data.forEach((f) => {
    if (f.id === idFilm) {
      dataLike = dataLikes.filter((f) => f.id === idFilm)[0];
      dataCible = {
        id: f.id,
        title: f.title,
        category: f.category,
        likes: dataLike.value ? f.likes + 1 : f.likes - 1,
        dislikes: f.dislikes,
      };
      dataUpdate = [...dataUpdate, dataCible];
    } else {
      dataUpdate = [...dataUpdate, f];
    }
  });

  store.dispatch(setLikes(dataLikes));

  //mise à jour de la liste des films
  store.dispatch(moviesFetching());
  store.dispatch(moviesResolved(dataUpdate));
};

export const jaimepas = (store, jaimespas, idFilm) => (dispatch) => {
  let data = store.getState().movies.data;
  let dataUpdate = [];
  let dataCible = {
    id: null,
    title: null,
    category: null,
    likes: null,
    dislikes: null,
  };
  //on parcours tout les élements de la liste on checkant le film dont veut changes ses likes
  let dataDisLikes = store.getState().movies.dislikes;
  let dataDisLike = {
    id: null,
    value: null,
  };
  let dataDisLikeCible = {
    id: null,
    value: null,
  };

  //if (dataLikes.length === 0)
  data.forEach((f) => {
    if (!dataDisLikes.filter((dl) => dl.id === f.id)[0]) {
      dataDisLike = {
        id: f.id,
        value: false,
      };
      dataDisLikes = [...dataDisLikes, dataDisLike];
    }
  });

  data.forEach((f) => {
    if (f.id === idFilm) {
      dataDisLikeCible = dataDisLikes.filter((f) => f.id === idFilm)[0];
      dataDisLikes = dataDisLikes.filter((f) => f.id !== idFilm);
      dataDisLike = {
        id: f.id,
        value: dataDisLikeCible.value ? false : true,
      };
      dataDisLikes = [...dataDisLikes, dataDisLike];
    }
  });

  data.forEach((f) => {
    if (f.id === idFilm) {
      dataDisLike = dataDisLikes.filter((f) => f.id === idFilm)[0];
      dataCible = {
        id: f.id,
        title: f.title,
        category: f.category,
        likes: f.likes,
        dislikes: dataDisLike.value ? f.dislikes + 1 : f.dislikes - 1,
      };
      dataUpdate = [...dataUpdate, dataCible];
    } else {
      dataUpdate = [...dataUpdate, f];
    }
  });

  store.dispatch(setDisLikes(dataDisLikes));

  //mise à jour de la liste des films
  store.dispatch(moviesFetching());
  store.dispatch(moviesResolved(dataUpdate));
};

export const getCategorie = (store, laCategorie) => (dispatch) => {
  store.dispatch(setCategorie(laCategorie));
  fetchOrUpdateMovies(store);
};

export const avancePagination = (store, nbrFilm) => (dispatch) => {
  store.dispatch(setCurrentPage(parseInt(nbrFilm)));
  fetchOrUpdateMovies(store);
};

export const reculePagination = (store, nbrFilm) => (dispatch) => {
  store.dispatch(setCurrentPage(parseInt(nbrFilm)));
  fetchOrUpdateMovies(store);
};

export const selectPageBy = (store, pageBy) => (dispatch) => {
  store.dispatch(setCurrentPage(0));
  store.dispatch(setPageBy(parseInt(pageBy)));
  fetchOrUpdateMovies(store);
};

export const filmSupprime = (store, idFilm) => async (dispatch) => {
  var tab = [];
  if (!store.getState().movies.listeFilmsSupprimes.includes(idFilm))
    tab = [...store.getState().movies.listeFilmsSupprimes, idFilm];
  else tab = store.getState().movies.listeFilmsSupprimes;
  store.dispatch(setFilmsSupprimes(tab));

  let liste = store.getState().movies.data;
  let filmEnQuestion = liste.filter((d) => d.id === idFilm)[0];
  let listeSansFilmEnQuestion = liste.filter((d) => d.id !== idFilm);

  let siCategExiste = listeSansFilmEnQuestion.filter(
    (m) => m.category.trim() === filmEnQuestion.category.trim()
  );

  if (siCategExiste.length === 0) store.dispatch(setCategExiste(false));

  //mise à jour des données
  await fetchOrUpdateMovies(store);
  //on se replace en arriére dans la pagination si le nombre de film dans la liste est à zéro
  if (
    store.getState().movies.data.length === 0 &&
    parseInt(store.getState().movies.currentPage) >=
      parseInt(store.getState().movies.pageBy)
  ) {
    store.dispatch(
      setCurrentPage(
        parseInt(store.getState().movies.currentPage) -
          parseInt(store.getState().movies.pageBy)
      )
    );
    await fetchOrUpdateMovies(store);
  } else {
    //si tout les films d'une catégorie ont été supprimés
    if (store.getState().movies.data.length === 0) {
      store.dispatch(setCategorie(""));
      await fetchOrUpdateMovies(store);
    }
  }
};

//fonction qui recupére la liste des catégories des films
export const getListeCategories = (store, data) => {
  var tabCategs = [];
  if (data != null && data.length > 0) {
    data.forEach((film) => {
      tabCategs = [...tabCategs, film.category];
    });

    //on néttoie le tableau des doublons
    tabCategs = tabCategs.filter(
      (item, index) => tabCategs.indexOf(item) === index
    );

    //on sauvegrade et on dispatch les catégories
    store.dispatch(setCategories(tabCategs));
  }
};

// cette fonction est une action asynchrone
// elle attend le store redux en paramètre
export async function fetchOrUpdateMovies(store) {
  // on peut lire le state actuel avec store.getState()
  const status = selectMovies(store.getState()).status;
  // si la requête est déjà en cours
  if (status === "pending" || status === "updating") {
    // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée
    return;
  }
  // On peut modifier le state en envoyant des actions avec store.dispatch()
  // ici on indique que la requête est en cours

  store.dispatch(moviesFetching());
  try {
    // on récupére la liste des films
    const data0 = await movies$;
    let nbrDebuListe = data0.length;
    //on néttoie les données récupérées des films supprimés aupréalable
    var tab = store.getState().movies.listeFilmsSupprimes;
    var listeMiseAjour = [];
    if (tab.length > 0) {
      data0.forEach((f) => {
        if (!tab.includes(f.id)) {
          listeMiseAjour = [...listeMiseAjour, f];
        }
      });
    } else listeMiseAjour = data0;

    getListeCategories(store, listeMiseAjour);
    //on remet la variable avec ça valeur false pour empecher le useeffect
    //de re - rendre le composant catégorie par les autres éléments
    store.dispatch(setCategExiste(true));

    //filtrer par catégorie si elle existe
    let cat = store.getState().movies.laCategorie;
    if (String(cat).length > 0 && cat !== undefined) {
      listeMiseAjour = listeMiseAjour.filter((f) => f.category === cat);
    }

    //tester si la page suivante existe pour bloqué le bouton suivant
    const listeFilmsPageSuivante = listeMiseAjour.slice(
      parseInt(store.getState().movies.currentPage) +
        parseInt(
          store.getState().movies.pageBy,
          parseInt(store.getState().movies.currentPage) +
            parseInt(store.getState().movies.pageBy) * 2
        )
    );

    listeFilmsPageSuivante.length > 0
      ? store.dispatch(setPageSuivanteExiste(true))
      : store.dispatch(setPageSuivanteExiste(false));

    //on calcule le nbr de page
    let nbrPage = 0;
    let tabPage = [];
    let donnePage = {
      num: null,
    };
    let leReste = listeMiseAjour.length % store.getState().movies.pageBy;
    if (leReste > 0)
      nbrPage = Math.ceil(
        listeMiseAjour.length / store.getState().movies.pageBy
      );
    else nbrPage = listeMiseAjour.length / store.getState().movies.pageBy;
    for (let i = 0; i < nbrPage; i++) {
      donnePage = {
        num: i,
      };
      tabPage = [...tabPage, donnePage];
    }
    store.dispatch(setNbrPage(tabPage));

    //on cherche la numéro de page actuelle
    let numPage =
      store.getState().movies.currentPage / store.getState().movies.pageBy;
    store.dispatch(setNumPage(numPage + 1));

    listeMiseAjour =
      store.getState().movies.currentPage !== 0
        ? listeMiseAjour.slice(
            parseInt(store.getState().movies.currentPage),
            parseInt(store.getState().movies.pageBy) +
              parseInt(store.getState().movies.currentPage)
          )
        : listeMiseAjour.slice(0, parseInt(store.getState().movies.pageBy));
    //mise à jours des likes
    let dataLikes = store.getState().movies.likes;
    let dataLike = {
      id: null,
      value: null,
    };
    let dataCible = {
      id: null,
      title: null,
      category: null,
      likes: null,
      dislikes: null,
    };
    let dataUpdate = [];
    listeMiseAjour.forEach((f) => {
      if (dataLikes.filter((fl) => f.id === fl.id && fl.value).length > 0) {
        dataLike = dataLikes.filter((fl) => f.id === fl.id && fl.value)[0];
        dataCible = {
          id: f.id,
          title: f.title,
          category: f.category,
          likes: dataLike.value ? f.likes + 1 : f.likes - 1,
          dislikes: f.dislikes,
        };
        dataUpdate = [...dataUpdate, dataCible];
      } else {
        dataUpdate = [...dataUpdate, f];
      }
    });

    listeMiseAjour = dataUpdate;

    //mise à jours des dislikes
    let dataDisLikes = store.getState().movies.dislikes;
    let dataDisLike = {
      id: null,
      value: null,
    };
    let dataDisCible = {
      id: null,
      title: null,
      category: null,
      likes: null,
      dislikes: null,
    };
    dataUpdate = [];
    listeMiseAjour.forEach((f) => {
      if (
        dataDisLikes.filter((fdl) => f.id === fdl.id && fdl.value).length > 0
      ) {
        dataDisLike = dataDisLikes.filter(
          (fdl) => f.id === fdl.id && fdl.value
        )[0];
        dataDisCible = {
          id: f.id,
          title: f.title,
          category: f.category,
          likes: f.likes,
          dislikes: dataDisLike.value ? f.dislikes + 1 : f.dislikes - 1,
        };
        dataUpdate = [...dataUpdate, dataDisCible];
      } else {
        dataUpdate = [...dataUpdate, f];
      }
    });

    //si la liste est vide pour quelconque raison
    if (
      dataUpdate.length === 0 &&
      store.getState().movies.listeFilmsSupprimes.length === nbrDebuListe
    ) {
      store.dispatch(setListeVide(true));
    }

    // si la requête fonctionne, on envoie les données à redux avec l'action resolved
    store.dispatch(moviesResolved(dataUpdate));
  } catch (error) {
    // en cas d'erreur on infirme le store avec l'action rejected
    store.dispatch(moviesRejected(error));
  }
}

export default function moviesReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FETCHING: {
        if (draft.status === "void") {
          draft.status = "pending";
          return;
        }
        if (draft.status === "rejected") {
          draft.error = null;
          draft.status = "pending";
          return;
        }
        // si le statut est resolved
        if (draft.status === "resolved") {
          // on passe en updating (requête en cours mais des données sont déjà présentent)
          draft.status = "updating";
          return;
        }
        // sinon l'action est ignorée
        return;
      }
      case RESOLVED: {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.data = action.payload;
          draft.status = "resolved";
          return;
        }
        return;
      }
      case REJECTED: {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.status = "rejected";
          draft.error = action.payload;
          draft.data = null;
          return;
        }
        return;
      }
      case CURRENTPAGE: {
        draft.currentPage = action.payload;
        return;
      }
      case FILMSSUPPRIMES: {
        draft.listeFilmsSupprimes = action.payload;
        return;
      }
      case PAGESUIVANTEEXISTE: {
        draft.pageSuivanteExiste = action.payload;
        return;
      }
      case PAGEBY: {
        draft.pageBy = action.payload;
        return;
      }
      case CATEGORIES: {
        draft.categories = action.payload;
        return;
      }
      case LACATEGORIE: {
        draft.laCategorie = action.payload;
        return;
      }
      case LIKES: {
        draft.likes = action.payload;
        return;
      }
      case DISLIKES: {
        draft.dislikes = action.payload;
        return;
      }
      case NBRPAGE: {
        draft.nbrPage = action.payload;
        return;
      }
      case NUMPAGE: {
        draft.numPage = action.payload;
        return;
      }
      case LISTEVIDE: {
        draft.listeVide = action.payload;
        return;
      }
      case CATEGEXISTE: {
        draft.categExiste = action.payload;
        return;
      }
      default:
        return;
    }
  });
}
