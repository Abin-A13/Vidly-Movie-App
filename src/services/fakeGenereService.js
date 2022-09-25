export const genres = [
{
    _id:"5b217f18",name:"Action"
},
{
    _id:"5b217f19",name:"Comedy"
},
{
    _id:"5b217f20",name:"Triller"
},
]
export function getGenereId(name){
    if(name===genres.name) return genres.filter(g => g._id)
    return genres.filter(g => g);
};

export function getGenere(){
    return genres.filter(g => g);
};