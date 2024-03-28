const fs = require("fs");
const path = require("path");

function addControllers(router, dir) {
  const files = fs.readdirSync(path.resolve(__dirname, dir));
  const js_files = files.filter((f) => {
    return f.endsWith(".js");
  });
  for (const f of js_files) {
    const file = require(path.resolve(__dirname, dir, f));
    addMapping(router, file);
  }
}

function addMapping(router, file) {
  for (const url in file) {
    console.log(url);
    if (url.startsWith("GET")) {
      const path = url.substring(4);
      router.get(path, file[url]);
    } else if (url.startsWith("POST")) {
      const path = url.substring(5);
      router.post(path, file[url]);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

module.exports = function (dir) {
  const controllers_dir = dir || "controllers";
  const router = require("koa-router")();
  addControllers(router, controllers_dir);
  // console.log(router);
  return router.routes();
};
