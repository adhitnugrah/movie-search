
import $ from "jquery";


$(document).ready(function () {
    $(".result-view").hide();
    $(".loading-view").hide();
});

window.cariFilm = async () => {

    let query = $("input").first().val();

    if (query) {
        try {
            let data = await getData(query, '1');
            showData(data);

        } catch (error) {
            alert('Ada Kesalahan Mengambil Data.')
        }
    } else {
        alert('Masukan Nama Film')
    }
    return false;
}

window.nextPage = async (p) => {

    let query = $("input").first().val();
    let pageSelect = p;

    if (query) {

        try {
            let data = await getData(query, pageSelect);
            showData(data);

        } catch (error) {
            alert('Ada Kesalahan Mengambil Data.')
        }

    } else {
        alert('Masukan Nama Film')
    }
    return false;
}

const getData = async (query, pageSelect) => {

    $(".result-view").hide();
    $(".loading-view").show();

    let response = await fetch(`http://www.omdbapi.com/?apikey=6eaffa5f&s=${query}&page=${pageSelect}`);
    let data = [];
    let page = 0;
    if (response.ok) { // if HTTP-status is 200-299
        let json = await response.json();
        data = json.Response == 'True' ? json.Search : [];
        page = json.Response == 'True' ? json.totalResults : 0;
        return {
            ret: "0",
            data: data,
            page: page
        }
    }

    return {
        ret: "-1",
        msg: "Gagal"
    }
}

const showData = (data) => {

    if (data.ret == "0") {
        elem.setAttribute('movie', JSON.stringify(data.data))
        elemPage.setAttribute('page', data.page)
    } else {
        alert('Silakan Refresh Halaman.')
    }

    $(".result-view").show();
    $(".loading-view").hide();
}