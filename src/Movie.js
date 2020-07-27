import React, { Component } from "react";
import ReactDOM from "react-dom";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilmFavorite: false
    };
  }

  _displayFavoriteImage() {
    if (this.state.isFilmFavorite /*this.props.isFilmFavorite*/) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return <img className="favorite_image" src={"/Images/ic_favorite.png"} />;
    } else {
      return (
        <img
          className="favorite_image"
          src={"/Images/ic_favorite_border.png"}
        />
      );
    }
  }

  _toogleFavorite() {
    console.log(" favorite____________________________");
    this.setState({
      isFilmFavorite: !this.state.isFilmFavorite
    });
  }

  _deleteFilm(id) {
    console.log(id);
  }

  render() {
    // const classes = useStyles();
    return (
      <div className="x">
        <div className="mediaCarContainer">
          <div className="mediaCarHeader">
            <div className="date">
              <div className="day_month">
                <span>{this.props.movie_category}</span>
              </div>
            </div>
            <div className="mediaCardImage">
              <img className="image" src="/contemplative-reptile.jpeg" />
            </div>
          </div>
          <div className="mediaCarTitle">
            {/* <h2>Titre</h2> */}
            <h2>{this.props.movie_title}</h2>
          </div>
          <div className="mediaCarBody">
            <p>
              {this.props.category}
              {/* Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity: */}
            </p>
          </div>
          <div className="favorite_delete">
            <div onClick={() => this._toogleFavorite()}>
              {this._displayFavoriteImage()}
            </div>
            <div onClick={() => this._deleteFilm(this.props.movie_id)}>
              <img className="delete_image" src={"/Images/img_408479.png"} />
            </div>
          </div>

          <div className="like_dislike_ration_div">
            <div className="like_ration_div">
              <span class="glyphicon glyphicon-thumbs-up"></span>

              <span>{this.props.movie_likes}</span>
            </div>
            <div className="dislike_ration_div">
              <span class="glyphicon glyphicon-thumbs-down"></span>

              <span>{this.props.movie_dislikes}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Movie;
