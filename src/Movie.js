import React, { Component } from "react";
import { connect } from "react-redux";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilmFavorite: false,
      movie: null
    };
  }

  componentDidMount() {
    this.setState({
      movie: this.props.movie
    });
  }

  _displayFavoriteImage() {
    if (this.state.isFilmFavorite /*this.props.isFilmFavorite*/) {
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
    console.log(" favorite____________________________");
    this.setState({
      isFilmFavorite: !this.state.isFilmFavorite
    });

    const action = { type: "LIKE_DISLIKE", value: this.state.movie };
    this.props.dispatch(action);
  }

  _deleteFilm(id) {
    const action = { type: "DELETE_MOVIE", value: this.state.movie };
    this.props.dispatch(action);
  }

  render() {
    // console.log(this.props);
    return (
      <div className="x">
        <div className="mediaCarContainer">
          <div className="mediaCarHeader">
            <div className="date">
              <div className="day_month">
                <span>{this.props.movie.category}</span>
              </div>
            </div>
            <div className="mediaCardImage">
              <img
                className="movie_image"
                src="/contemplative-reptile.jpeg"
                alt="photo du film"
              />
            </div>
          </div>
          <div className="mediaCarTitle">
            <h2>{this.props.movie.title}</h2>
          </div>
          <div className="mediaCarBody">
            <p></p>
          </div>
          <div className="favorite_delete">
            <div onClick={() => this._toogleLoveMovie()}>
              {this._displayFavoriteImage()}
            </div>
            <div onClick={() => this._deleteFilm(this.props.movie_id)}>
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

export default connect()(Movie);
