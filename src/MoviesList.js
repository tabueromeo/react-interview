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
      moviesPerPage: 4,
      moviesList: null,
      loadingOk: false,
      deleteMovies: [],
      likes: [],
      dislikes: [],
      selected: []
    };
  }

  componentDidMount() {
    movies$.then(movies => {
      this.setState(state => {
        return {
          moviesList: movies,
          loadingOk: true
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
      moviesPerPage: e.target.value
    });
  };

  setSelected = value => {
    this.setState({
      selected: [value]
    });
  };

  render() {
    const {
      currentPage,
      moviesPerPage,
      moviesList,
      loadingOk,
      selected
    } = this.state;

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

    let options = [];
    let i = 0;
    loadingOk &&
      moviesList.map(
        val => (options[i++] = { label: val.category, value: val.id })
      );

    console.log(this.props);
    return (
      <div className="container">
        <div className="select_categorie_class">
          <h3>Selectionnez les catégories</h3>

          <MultiSelect
            options={options}
            selected={selected}
            onSelectedChanged={selected => this.setState({ selected })}
          />
        </div>

        <div className="list_idem">
          {loadingOk &&
            moviesList.length > 0 &&
            moviesList.slice(indexOfFirstMovie, indexOfLastMovie).map(val => (
              <div className="maindiv">
                <Movie movie={val} />
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
