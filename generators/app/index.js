'use strict';
let generator = require('yeoman-generator');
let chalk = require('chalk');
let yosay = require('yosay');
let path = require('path');
let mkdirp = require('mkdirp');
let _ = require('lodash');
let extend= require('deep-extend');
let rootTemplatePath=path.dirname(require.resolve('szq-template'));
let config=require('../../until/config.js');
//let ExtractTextPlugin = require('extract-text-webpack-plugin');
/*console.log(installDev.getInstalldev());*/


let con={
  constructor: function() {
    generator.apply(this, arguments);
    // Make options available
    this.option('skip-welcome-message', {
      desc: 'Skip the welcome message',
      type: Boolean,
      defaults: false
    });
    this.option('skip-install');
    this.sourceRoot(rootTemplatePath);
    this.config.save();
  },

  initializing: function() {
    this.log(yosay(
      'Welcome to the swell ' + chalk.red('generator-szq') + ' generator!'
    ));

  },
  prompting: function () {

    var prompts = [{
      type: 'list',
      name: 'style',
      message: 'Which style language do you want to use? (Use arrow keys)',
      choices:['css','less','sass'],
      default:true
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name',
        default:'default'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },
  default:function(){
      this.fs.copy(this.templatePath('app'),this.destinationPath('app'));
      this.fs.write('app/style/index.'+this.props.style,"");
      this.fs.write('app/index.js','');
      mkdirp('src');
  },
  writing: function () {
    var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));
    this.fs.write(this.destinationPath('README.md'), readmeTpl({
      generatorName: 'generator-szq',
      yoName: 'szq'
    }));


    var pkg = this.fs.readJSON(this.templatePath('package.json'), {});
        extend(pkg,{
          name:this.props.projectName,
          "dependencies": {
            "webpack": "^1.12.0",
            "webpack-dev-server": "^1.12.0",
          },
        });
  /*  pkg.devDependencies[this.props.style+'-loader']=this.props.style+'-loader';*/
      pkg.devDependencies=config.getInstalldev();
     /* config.setLoader();*/
    this.fs.copy(this.templatePath(this.sourceRoot()),this.destinationPath());
    this.fs.copy(this.templatePath('.babelrc'),this.destinationPath('.babelrc'));
    this.fs.copy(this.templatePath('.eslintrc.json'),this.destinationPath('.eslintrc.json'))
    this.fs.writeJSON(this.destinationPath('package.json'),pkg);
  },

    install: function () {
      this.installDependencies({ bower: false });
   }
}
/*con.prototype=generator.prototype;*/
module.exports = generator.extend(con);
