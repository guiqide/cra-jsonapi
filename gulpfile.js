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
  {
    name: "tailwind.config.js",
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
  "react-router-dom": "^5.3.0",
  "@types/react-router-dom": "^5.1.8",
  "@types/jest": "^27.0.1",
  "@types/lodash": "^4.14.172",
  "@types/node": "^16.7.13",
  "@types/react": "^17.0.20",
  "@types/react-dom": "^17.0.9",
  "@typescript-eslint/parser": "^4.31.0",
  craco: "0.0.3",
  lodash: "^4.17.21",
  antd: "^4.16.13",
  "craco-less": "^1.20.0",
  typescript: "^4.4.2",
  "web-vitals": "^2.1.0",
  postcss: "^7.0.36",
  autoprefixer: "^9.8.6",
  tailwindcss: "npm:@tailwindcss/postcss7-compat@^2.2.10",
  "@types/webpack-env": "^1.16.2",
  "history": "^5.0.1",
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
        src(`${item.name}/**/*.*`)
          .pipe(gulpif(!!item.rename, rename(item.rename)))
          .pipe(dest(`dist/template/${item.name}`))
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
