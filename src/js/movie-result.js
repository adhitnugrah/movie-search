class MovieResult extends HTMLElement {

    render() {
        let movieData = JSON.parse(this.getAttribute('movie')) || [];
        let movieShow = "";

        movieShow += `<div class="result-wrap">`
        if (movieData.length) {

            movieData.forEach(movie => {
                movieShow += `
                 <div class="movie-card">
                    
                    <img src="${movie.Poster}"
                        alt="${movie.Title}" />
                    <div class="movie-desc">
                        <h2>${movie.Title}</h2>
                        <h3>${movie.Year}</h3>
                    </div>
                </div>
            `;
            })
        } else {
            movieShow += `<p style="width: 100%;text-align: center;"> <strong> Film Tidak Ditemukan </strong> </p>`;
            movieShow += `<div><img src="../src/img/404.svg" width="300px"> </img></div>`;
        }
        movieShow += `</div>`;


        this.innerHTML = movieShow;
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    static get observedAttributes() { // (3)
        return ['movie'];
    }

    attributeChangedCallback(name, oldValue, newValue) { // (4)
        this.render();
    }

}

customElements.define("movie-result", MovieResult);