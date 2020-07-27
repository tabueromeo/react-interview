import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { movies$ } from "./Helpers/movies";
import "antd/dist/antd.css";
import Movie from "./Movie";
import { Pagination } from "antd";
import MultiSelect from "@khanacademy/react-multi-select";

const numEachPage = 4;

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      todosPerPage: 5,
      moviesList: null,
      loadingOk: false,
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
    alert(value);
    this.setState({
      currentPage: value
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
      todosPerPage,
      moviesList,
      loadingOk,
      selected,
      setSelected
    } = this.state;

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos =
      loadingOk && moviesList.slice(indexOfFirstTodo, indexOfLastTodo);

    let options = [];
    let i = 0;
    loadingOk &&
      moviesList.map(
        val => (options[i++] = { label: val.category, value: val.id })
      );

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
          {/* <Pagination/> */}
          {loadingOk &&
            moviesList.length > 0 &&
            moviesList.slice(indexOfFirstTodo, indexOfLastTodo).map(val => (
              <div className="maindiv">
                <Movie
                  movie_category={val.category}
                  movie_title={val.title}
                  movie_likes={val.likes}
                  movie_dislikes={val.dislikes}
                  movie_id={val.id}
                />
              </div>
            ))}
        </div>
        <div className="pagination_div">
          <Pagination
            defaultCurrent={1}
            defaultPageSize={5} //default size of page
            onChange={this.handleChange}
            total={10} //total number of card data available
          />

          <div class="form-group">
            <select class="form-control" id="exampleFormControlSelect1">
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
export default MoviesList;
