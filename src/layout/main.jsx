import React from "react";
import { Movies } from "../components/Movies";
import { Search } from "../components/search";
import { Preloader } from "../components/preloader";
import { type } from "@testing-library/user-event/dist/type";

class Main extends React.Component {
    state = {
        movies: [],
        loading: true,
    };
    componentDidMount() {
        fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=544eee53&s=matrix`)
            .then((response) => response.json())
            .then((data) => this.setState({ movies: data.Search, loading: false }));
    }

    searchMovies = (str, type = "all") => {
        this.setState({ loading: true });
        fetch(
            `http://www.omdbapi.com/?apikey=20d64e58&s=${str}${type !== "all" ? `&type=${type}` : ""
            }`
        )
            .then((response) => response.json())
            .then((data) => this.setState({ movies: data.Search, loading: false }));
    };

    render() {
        const { movies, loading } = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                {loading ? <Preloader /> : <Movies movies={this.state.movies} />}
            </main>
        );
    }
}

export { Main };