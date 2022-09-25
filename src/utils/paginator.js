import _ from "lodash";

const paginator = (movies, pageNumber, pagesize) => {
  let index = (pageNumber - 1) * pagesize;
  return _(movies).slice(index).take(pagesize).value();
};

export default paginator;
