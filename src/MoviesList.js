import React, { Component } from "react";
import { connect } from "react-redux";
import { movies$ } from "./Helpers/movies";
import "antd/dist/antd.css";
import Movie from "./Movie";
import { Pagination } from "antd";
import MultiSelect from "@khanacademy/react-multi-select";

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      moviesPerPage: 8,
      moviesList: null,
      loadingOk: false,
      likes: [],
      listCatergorie: [],
      dislikes: [],
      selected: [],
      elementAreDelete: false
    };
    this.deletehandle = this.deletehandle.bind(this);
  }

  filterDeleteMovie(movies) {
    let tmp_movies = [];
    movies.map(movie => {
      if (!this.props.deleteMovies.includes(movie)) {
        tmp_movies.push(movie);
      }
    });

    return tmp_movies;
  }

  deletehandle() {
    this.setState({
      elementAreDelete: true
    });
  }

  filterListcategorie(movies) {
    let tmp_listCatergorie = [];
    movies.map(val => {
      if (!tmp_listCatergorie.includes(val.category)) {
        tmp_listCatergorie.push(val.category);
      }
    });
    this.setState({
      listCatergorie: tmp_listCatergorie
    });
  }

  componentDidMount() {
    movies$.then(movies => {
      this.filterListcategorie(this.filterDeleteMovie(movies));

      this.setState(state => {
        return {
          moviesList: movies,
          loadingOk: true,
          selected: this.state.listCatergorie
        };
      });
    });
  }

  handleChange = value => {
    this.setState({
      currentPage: value
    });
  };

  handleSelectChange = e => {
    this.setState({
      moviesPerPage: e.target.value,
      currentPage: 1
    });
  };

  handleSelectCategorieChange = selected => {
    this.setState({ selected });
    let movie_tmps = [];

    movies$.then(movies => {
      this.filterDeleteMovie(movies).map(val => {
        if (this.state.selected.includes(val.category)) {
          movie_tmps.push(val);
        }
      });

      this.setState(state => {
        return {
          moviesList: movie_tmps,
          loadingOk: true
        };
      });
    });
  };

  render() {
    const {
      currentPage,
      moviesPerPage,
      moviesList,
      listCatergorie,
      loadingOk,
      selected
    } = this.state;

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

    let options = [];
    let i = 0;
    loadingOk &&
      listCatergorie.map(val => (options[i++] = { label: val, value: val }));

    if (this.state.elementAreDelete) {
      let movies_temp = this.filterDeleteMovie(this.state.moviesList);
      this.filterListcategorie(movies_temp);
      this.setState({
        moviesList: movies_temp,
        elementAreDelete: false
      });
    }

    return (
      <div className="container">
        <div className="select_categorie_class">
          <h3>Selectionnez les catégories</h3>

          <MultiSelect
            options={options}
            selected={selected}
            onSelectedChanged={this.handleSelectCategorieChange}
          />
        </div>

        <div className="list_idem">
          {loadingOk &&
            moviesList.length > 0 &&
            moviesList.slice(indexOfFirstMovie, indexOfLastMovie).map(val => (
              <div className="maindiv">
                <Movie movie={val} handleclique={this.deletehandle} />
              </div>
            ))}
        </div>
        <div className="pagination_div">
          <Pagination
            defaultCurrent={this.state.currentPage}
            defaultPageSize={this.state.moviesPerPage} //default size of page
            pageSize={this.state.moviesPerPage}
            onChange={this.handleChange}
            total={loadingOk && moviesList.length > 0 && moviesList.length} //total number of card data available
          />

          <div class="form-group">
            <select
              name="nombre_par_page"
              class="form-control"
              id="exampleFormControlSelect1"
              componentClass="select"
              value={this.state.moviesPerPage}
              onChange={this.handleSelectChange}
            >
              <option>4</option>
              <option>8</option>
              <option>12</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    deleteMovies: state.deleteMovies,
    likes: state.likes,
    dislikes: state.dislikes
  };
};
export default connect(mapStateToProps)(MoviesList);
