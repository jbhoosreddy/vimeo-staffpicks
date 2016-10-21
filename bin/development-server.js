#!/usr/bin/env node

"use strict";

require("babel-register");

const webpack = require("webpack");
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const http = require("http");

const Vimeo = require('vimeo').Vimeo;
const CLIENT_ID = process.env.CLIENT_ID || "e1f36179c16785f444588cdb2a490cd319a540ed";
const CLIENT_SECRET = process.env.CLIENT_SECRET || "M1KGfQrk4wexEyGzWylwSzCu9kkPdv/xJ/bCnoGiTWAXwElcrI/VO9g7OPW36QVpN23F3l5GILt7p/NiLWZdv3DJiLE0GK9Qs6CkGjYFdG/Z4DkZvonrJs3ezxO6xtTe";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "ed3b7773a1ca398ef5391a77e8a3a404";
const lib = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

const config = require("../config/config");

const app = express();

// Webpack middleware
const webpackConfig = require("../webpack.config");
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  stats: { colors: true }
}));


if (config.getValue("hotReloading")) {
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log("Hot Reloading can be enabled by adding " +
  "\"hotReloading\": true to your config.json file");
}

// Static middleware
app.use(express.static("public"));


app.get('/api/channels/staffpicks/videos/:page/:sort', function(req, res) {
  const page = req.params.page;
  const sort = req.params.sort;
  lib.request({
    path: '/channels/staffpicks/videos',
    query: {
      sort,
      page
    }
  }, function(error, body, status_code, headers) {
    if (error) {
      console.log('error');
      console.log(error);
    } else {
      res.json(body);
    }
  });
});

// Listen'
const SERVER_PORT = process.env.PORT || config.getValue("development.serverPort");
app.listen(SERVER_PORT, "0.0.0.0", function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Development Server Listening at http://localhost:${SERVER_PORT}`);
  }
});