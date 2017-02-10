



let loader={
  /*    preLoaders: [
   {
   test: /\.js$/,
   include: srcPath,
   loader: 'eslint-loader'
   }
   ],*/
  style: {
    'js': {
      test: ['/\.js$/', '/\.es6$/'],
      exclude: '/node_modules/',
      loader: 'babel-loader',
      query: {
        presets: ['es2015', "stage-0",],
        plugins: ['transform-runtime']
      }
    },
    'css': {
      test: '/\.css$/',
      loader: 'style-loader!css-loader?modules!postcss-loader}'
    },
    'sass': {
      test: '/\.sass/',
      loader: 'style-loader!css-loader?modules!postcss-loader!sass-loader'
    },
    'scss': {
      test: '/\.scss/',
      loader: 'style-loader!css-loader?modules!postcss-loader!sass-loader'
    },
    'less': {
      test: '/\.less/',
      loader: 'style-loader!css-loader?modules!less-loader!postcss-loader'
    },
    'stylus': {
      test: '/\.styl/',
      loader: 'style-loader!css-loader?modules!stylus-loader!postcss-loader'
    }
  }

  ,
  other: {
    'json': {
      test:'/\.json$/',
      loader: 'json-loader'
    },
    'url': {
      test: '/\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/',
      loader: 'url-loader?limit=8192'
    },
    'file': {
      test: '/\.(mp4|ogg|svg)$/',
      loader: 'file-loader'
    }
  }
};


module.exports=loader;