import { boot } from "quasar/wrappers";

export default boot(({ app, router, store }) => {
  app.config.globalProperties.$groupBy = (array, field) => {
    return array.reduce((r, a) => {
      r[a[field]] = r[field] || [];
      r[a[field]].push(a);
      return r;
    }, Object.create(null));
  };

  app.config.globalProperties.$buildURLQuery = (obj) => {
    return Object.entries(obj)
      .map((pair) => {
        if (pair[1]) {
          return pair.map(encodeURIComponent).join("=");
        }
      })
      .join("&");
  };

  app.config.globalProperties.$wrapAggr = (aggr) => {
    if (aggr <= 2) {
      return `D${aggr}`;
    } else if (aggr <= 6) {
      return `C${aggr}`;
    } else if (aggr <= 8) {
      return `P${aggr}`;
    } else if (aggr == 9) {
      return `F${aggr}`;
    }
  };
});
