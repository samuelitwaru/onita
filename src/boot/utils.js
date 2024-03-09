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

  app.config.globalProperties.$secondsToHoursMinutes = (
    seconds,
    returnformatted = true
  ) => {
    function addLeadingZero(number) {
      return number < 10 ? "0" + number : String(number);
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (returnformatted) {
      return `${hours} Hours, ${addLeadingZero(minutes)} Minutes`;
    }
    return { hours, minutes };
  };

  app.config.globalProperties.$formatTime = (seconds) => {
    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Create a formatted time string
    const formattedTime = `${hours}h ${minutes}m ${remainingSeconds}s`;

    return formattedTime;
  };
});
