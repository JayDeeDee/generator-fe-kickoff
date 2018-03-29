'use strict';
const Generator = require('yeoman-generator');
// @todo const commandExists = require('command-exists').sync;
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  /**
   * Constructor for the Generator
   * @param args
   * @param opts
   */
  constructor(args, opts) {
    super(args, opts);

    /**
     * Set option skip welcome message
     */
    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    /**
     * Set option skip install message
     */
    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the sensational ${chalk.red('generator-felab')} generator!`)
    );
    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this._writingEditorConfig();
    this._writingSassLint();
    // @todo this._writingGulpfile();
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }

  /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * Various private methods for copying files into the project
   */

  /**
   * Rename and copy .editorConfig to project root
   * @private
   */
  _writingEditorConfig() {
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
  }

  /**
   * Rename and copy .sass-lint.yml to project root
   * @private
   */
  _writingSassLint() {
    this.fs.copy(this.templatePath('sass-lint'), this.destinationPath('.sass-lint.yml'));
  }

  /**
   * Copy GulpFile to project root
   * @private
   */
  _writingGulpfile() {
    this.fs.copy(this.templatePath('Gulpfile.js'), this.destinationPath('Gulpfile.js'));
  }
};
