SystemJS.config({
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/",
      "@mjleitch/epic-observable/": "/src/"
    }
  },
  nodeConfig: {
    "paths": {
      "npm:": "jspm_packages/npm/",
      "@mjleitch/epic-observable/": "src/"
    }
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.16"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "@mjleitch/epic-observable": {
      "main": "@mjleitch/epic-observable.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "rxjs": "npm:rxjs@5.0.0-rc.1"
  },
  packages: {
    "npm:rxjs@5.0.0-rc.1": {
      "map": {
        "symbol-observable": "npm:symbol-observable@1.0.4"
      }
    }
  }
});
