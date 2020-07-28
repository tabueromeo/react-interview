import React, { Component } from "react";
import { connect } from "react-redux";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilmFavorite: false
    };
  }

  componentDidMount() {
    this.setState({
      movie: this.props.movie
    });
  }

  _displayFavoriteImage() {
    if (this.props.movie.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <img
          className="favorite_image"
          alt="j'aime"
          src={"/Images/ic_favorite.png"}
        />
      );
    } else {
      return (
        <img
          className="favorite_image"
          src={"/Images/ic_favorite_border.png"}
          alt="je n'aime pas"
        />
      );
    }
  }

  _toogleLoveMovie() {
    this.setState({
      isFilmFavorite: !this.state.isFilmFavorite
    });
    this.props.movie.isFilmFavorite = !this.props.movie.isFilmFavorite;

    const action = { type: "LIKE_DISLIKE", value: this.props.movie };
    this.props.dispatch(action);
  }

  _deleteFilm(id) {
    const action = { type: "DELETE_MOVIE", value: this.props.movie };

    this.props.dispatch(action);
    this.props.handleclique(this.props.movie);
  }

  render() {
    return (
      <div className="x">
        <div className="movieCarContainer">
          <div className="movieCarHeader">
            <div className="caterogy">
              <div>
                <span>{this.props.movie.category}</span>
              </div>
            </div>
            <div className="movieCardImage">
              <img
                className="movie_image"
                src="/contemplative-reptile.jpeg"
                alt="photo du film"
              />
            </div>
          </div>
          <div className="movieCarTitle">
            <h2>{this.props.movie.title}</h2>
          </div>
          <div className="movieCarBody">
            <p></p>
          </div>
          <div className="favorite_delete">
            <div onClick={() => this._toogleLoveMovie()}>
              {this._displayFavoriteImage()}
            </div>
            <div onClick={() => this._deleteFilm()}>
              <img
                className="delete_image"
                alt="supprimer"
                src={"/Images/img_408479.png"}
              />
            </div>
          </div>

          <div className="like_dislike_ration_div">
            <div className="like_ration_div">
              <span class="glyphicon glyphicon-thumbs-up"></span>

              <span>{this.props.movie.likes}</span>
            </div>
            <div className="dislike_ration_div">
              <span class="glyphicon glyphicon-thumbs-down"></span>

              <span>{this.props.movie.dislikes}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deleteMovies: state.deleteMovies,
    isFilmFavorite: state.isFilmFavorite
  };
};

export default connect(mapStateToProps)(Movie);
