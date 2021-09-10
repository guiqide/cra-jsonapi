const { src, dest, series } = require("gulp");
const gulpif = require("gulp-if");
const rename = require("gulp-rename");
const pkg = require("./package.json");
const jsonFormat = require("json-format");
const fs = require("fs");
const del = require("del");

const templateDirList = [
  {
    name: ".gitignore",
    rename: "gitignore",
  },
  {
    name: ".env",
  },
  {
    name: ".env.staging",
  },

  {
    name: ".env.production",
  },
  {
    name: ".editorconfig",
  },
  {
    name: "craco.config.js",
  },
  {
    name: ".eslintignore",
  },
  {
    name: "eslint.config.js",
  },
  {
    name: "jestconfig.json",
  },
  {
    name: "LICENSE",
  },
  {
    name: "paths.json",
  },
  {
    name: "paths.json",
  },
  {
    name: "README.temp.md",
    rename: "README.md",
  },
  {
    name: "tsconfig.json",
  },
  {
    name: "src",
  },
  {
    name: "public",
  },
  {
    name: "docs",
  },
];

const rootDirList = [
  {
    name: "package.json",
  },
  {
    name: "README.md",
  },
];

const depObj = {
  craco: "0.0.3",
  lodash: "^4.17.21",
  antd: "^4.16.13",
  "craco-less": "^1.20.0",
  typescript: "^4.4.2",
};

const devDepObj = {
  "cz-conventional-changelog": "^3.3.0",
};

function generateTempateFile(cb) {
  const file = {};
  // 过滤掉gulp
  Object.keys(pkg.devDependencies).forEach((item) => {
    if (/^gulp/.test(item)) {
      delete pkg.devDependencies[item];
    }
  });
  file.package = {
    scripts: {
      start: "craco start",
      build: "craco build",
      test: "craco test",
    },
    config: pkg.config,
    dependencies: depObj,
    devDependencies: devDepObj,
  };
  fs.writeFileSync("dist/template.json", jsonFormat(file));
  cb();
}

function copyfile(cb) {
  const pro = new Promise((resolve, reject) => {
    // 复制根目录文件
    rootDirList.forEach((item) => {
      src(item.name)
        .pipe(gulpif(!!item.rename, rename(item.rename)))
        .pipe(dest("dist"));
    });

    // 复制template目录文件
    templateDirList.forEach((item) => {
      const dirent = fs.statSync(item.name);
			
      if (!dirent.isDirectory(item.name)) {
        src(item.name)
          .pipe(gulpif(!!item.rename, rename(item.rename)))
          .pipe(dest("dist/template"))
          .on("end", resolve);
      } else {
        src(`${item.name}/*.*`)
          .pipe(gulpif(!!item.rename, rename(item.rename)))
          .pipe(dest("dist/template"))
          .on("end", resolve);
      }
    });
  });
  pro.then(() => {
    cb();
  });
}

function clean(cb) {
  del(["dist"]).then(() => {
    cb();
  });
}
exports.default = series(clean, copyfile, generateTempateFile);
