'use strict';
const Generator = require('yeoman-generator');
const commandExists = require('command-exists').sync;
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const yosay = require('yosay');

module.exports = class extends Generator {
  /**
   * Constructor for the Generator
   * @param args  options and flags from cli
   * @param opts  configuration
   */
  constructor(args, opts) {
    super(args, opts);

    console.log(args);
    // Cconsole.log(opts);
    /**
     * Set option skip welcome message
     */
    this.option('skip-welcome-msg', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    /**
     * Set option skip install message
     */
    this.option('skip-install-msg', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });

    /**
     * Set option use feature for jquery or bootstrap
     */
    this.option('use-feature', {
      desc: 'Includes bootstrap or jquery: bs-reset, bs-grid, bs-modules, jquery or none',
      type: String
    });

    /**
     * Set option use velocity
     */
    this.option('use-velocity', {
      desc: 'Includes velocity',
      type: Boolean
    });

    /**
     * Set option use vrt (visual regression testing)
     */
    this.option('use-vrt', {
      desc: 'Includes a tool for Visual Regression Testing',
      type: Boolean
    });
  }

  /**
   * Dialog phase for user prompting
   * @returns {Promise|Promise.<TResult>|*}
   */
  prompting() {
    // Greet the user if option is not skipped
    if (!this.options['skip-welcome-msg']) {
      this.log(
        yosay(`Let's build a design system with the ${chalk.yellow('felab')} generator!`)
      );
    }
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

  /**
   * Writing phase
   */
  writing() {
    this._writingEditorConfig();
    this._writingSassLint();
    this._writingGruntfile();
    this._writingGulpfile();
  }

  /**
   * Installation phase can be skipped by option skip-install
   */
  install() {
    const hasYarn = commandExists('yarn');

    this.installDependencies({
      npm: !hasYarn, // Use npm as fallback, if yarn is not installed
      bower: false, // Do not use bower
      yarn: hasYarn,
      skipMessage: this.options['skip-install-msg'],
      skipInstall: this.options['skip-install']
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
   * Rename and copy .gitignore to project root
   * @private
   */
  _writingGitIgnore() {
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
  }

  /**
   * Rename and copy .sass-lint.yml to project root
   * @private
   */
  _writingSassLint() {
    this.fs.copy(this.templatePath('sass-lint'), this.destinationPath('.sass-lint.yml'));
  }

  /**
   * Copy gulpfile to project root
   * @private
   */
  _writingGulpfile() {
    this.fs.copy(this.templatePath('Gulpfile.js'), this.destinationPath('Gulpfile.js'));
  }

  /**
   * Copy gruntfile to project root
   * @private
   */
  _writingGruntfile() {
    this.fs.copy(this.templatePath('Gruntfile.js'), this.destinationPath('Gruntfile.js'));
  }

  _buildSrcFolder() {
    const markup = [
      'helpers',
      'layouts',
      'pages',
      'partials/areas',
      'partials/elements',
      'partials/modules',
      'partials/structure'
    ];
    this._buildPathFromArray('src/', markup);
  }

  /**
   * Builds various folders
   * @param paths array of paths for the folders
   * @param prefix prefix for the paths
   * @private
   */
  _buildPathFromArray(prefix, paths) {
    paths.forEach(function(path) {
      mkdirp(prefix + path);
    });
  }
};
