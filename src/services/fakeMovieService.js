
const movies = [
    {
        _id : "5d34561",
        tittle:"Terminator",
        genre: "Action",
        numberInStock:6,
        dailyRentalRate:2.5,
        publishDate:"2018-01-03T19:04:28.809Z",
        liked : false
    },
    {
        _id : "62557289",
        tittle:"Die hard",
        genre:"Action",
        numberInStock:5,
        dailyRentalRate:2.5,
        liked : false
    },
    {
        _id : "2525469",
        tittle:"Trip to Italy",
        genre:"Comedy",
        numberInStock:7,
        dailyRentalRate:3.5,
        liked : true
    },
    {
        _id : "3525564",
        tittle:"Get Out",
        genre:"Triller",
        numberInStock:8,
        dailyRentalRate:2.5,
        liked : true
    },
    {
        _id : "7656295",
        tittle:"Airplane",
        genre:"Comedy",
        numberInStock:7,
        dailyRentalRate:3.5,
        liked : true
    },
    {
        _id : "975425726",
        tittle:"Wedding Crashers",
        genre:"Comedy",
        numberInStock:7,
        dailyRentalRate:3.5,
        liked : true
    },
    {
        _id : "1238001",
        tittle:"Gone Gril",
        genre:"Triller",
        numberInStock:7,
        dailyRentalRate:4.5,
        liked : true
    },
];
export function getMovies(){
    return movies;
}
export function getMovie(id){
    return movies.find(m=>m.id===id);
}

export function saveMovies(movie){
    let movieInDb = movies.find(m => m._id === movies._id) || {};
    movieInDb.name = movie.name;
    movieInDb.genre = movie.genre;
    movieInDb.numberInStock = movie.numberInStock;
    movieInDb.dailyRentalRate = movie.dailyRentalRate;
    if (!movieInDb._id){
        movieInDb._id = Date.now().toString();
        movie.push(movieInDb);
    }
    return movies;
}
