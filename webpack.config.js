/* eslint-disable */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const PAGES = [
  {
    filename: 'index.html',
    template: './index.html',
  },
  {
    filename: 'movie-details.html',
    template: './movie-details.html',
  },
  {
    filename: 'create-movie.html',
    template: './create-movie.html',
  },
  {
    filename: 'edit-movie.html',
    template: './edit-movie.html',
  }
]

const createHTMLPages = () => PAGES.map(({ filename, template }) => new HTMLWebpackPlugin({
  filename,
  template,
  minify: {
    collapseWhitespace: isProd,
  },
}))

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config
}

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash:8].${ext}`)

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    'css-loader',
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(),
    },
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

const plugins = () => [
  new CleanWebpackPlugin(),
  ...createHTMLPages(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'src/assets/favicon.ico'),
        to: path.resolve(__dirname, 'build'),
      },
      {
        from: path.resolve(__dirname, 'src/assets/images'),
        to: path.resolve(__dirname, 'build', 'assets/images'),
      },
    ],
  }),
  new MiniCssExtractPlugin({
    filename: filename('css'),
  }),
]

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  optimization: optimization(),
  devServer: {
    port: 3001,
    open: true,
    hot: isDev,
  },
  plugins: plugins(),
  devtool: isDev ? 'source-map' : '',
  module: {
    rules: [
      // Loading CSS
      {
        test: /\.css$/,
        use: cssLoaders(),
        exclude: /\.module\.css$/,
      },
      // Loading CSS modules
      {
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
      // Loading images
      {
        test: /\.jpe?g$|\.gif$|\.png|\.ico|\.svg$/,
        use: ['file-loader'],
      },
      // Loading fonts
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: ['file-loader'],
      },
      // Loading CSV
      {
        test: /\.csv$/,
        use: ['csv-loader'],
      },
      // Babel JS
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
}
