const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

let config = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "build.js",
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".json",
      ".scss",
      ".css",
      ".jpeg",
      ".jpg",
      ".gif",
      ".png",
    ],
    alias: {
      images: path.resolve(__dirname, "src/assets/images"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", { modules: "commonjs" }],
            "@babel/preset-react",
          ],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?context=src/assets/images/&name=images/[path][name].[ext]",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 4,
              },
              pngquant: {
                quality: [0.75, 0.9],
                speed: 3,
              },
            },
          },
        ],
        exclude: /node_modules/,
        include: __dirname,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new DashboardPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "./public"),
    },
    historyApiFallback: true,
    open: true,
    port: 3005,
  },
};

module.exports = config;

if (process.env.NODE_ENV == "production") {
  module.exports.plugins.push(new UglifyJsPlugin(), new CssMinimizerPlugin());
}
