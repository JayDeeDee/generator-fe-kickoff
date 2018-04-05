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

    const prompts =
      this.options['use-velocity'] ||
      this.options['use-feature'] ||
      this.options['use-vrt']
        ? []
        : [
            {
              type: 'list',
              choices: [
                {
                  name: 'Bootstrap Grid System',
                  value: 'bs-grid'
                },
                {
                  name: 'Bootstrap Reboot',
                  value: 'bs-reset'
                },
                {
                  name: 'Bootstrap Grid System and Components',
                  value: 'bs-modules'
                },
                {
                  name: 'jQuery',
                  value: 'jquery'
                },
                {
                  name: 'None',
                  value: 'none'
                }
              ],
              name: 'useFeature',
              message:
                'Which Bootstrap Option would you like to include? Or just jQuery instead?',
              default: 'None'
            },
            {
              type: 'confirm',
              name: 'useVelocity',
              message: 'Do you want to use Velocity.js for faster animations?',
              default: false
            },
            {
              type: 'confirm',
              name: 'useVRT',
              message: 'Do you want do add Visual Regression Tests to your local server?',
              default: false
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
    this._buildFolders();

    // Fixed elements
    this._writingEditorConfig();
    this._writingGitIgnore();
    this._writingSassLint();
    this._writingGrunt();
    this._writingGulp();
    this._writingMarkup();
    this._writingScript();

    // Flexible element
    this._adaptPackageJSON();
    this._adaptSass();
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
   * Adapt package.json
   * @private
   */
  _adaptPackageJSON() {
    const feat = this.props.useFeature;
    const opt = this.options['use-feature'];

    let isBootstrap = false;
    let isJquery = false;
    let isVelocity = false;
    let isVRT = false;
    if (feat) {
      isBootstrap = feat.indexOf('bs') >= 0;
      isJquery = isBootstrap || feat.indexOf('jquery') >= 0;
    } else if (opt) {
      isBootstrap = opt.indexOf('bs') >= 0;
      isJquery = isBootstrap || opt.indexOf('jquery') >= 0;
    }

    if (this.props.useVelocity || this.options['use-velocity']) {
      isVelocity = true;
    }
    if (this.props.useVRT || this.options['use-vrt']) {
      isVRT = true;
    }

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        includeVelocity: isVelocity,
        includeBootstrap: isBootstrap,
        includeJquery: isJquery,
        includeVRT: isVRT
      }
    );
  }

  /**
   * Adapt require.scss and rename and copy modules
   * @private
   */
  _adaptSass() {
    const feat = this.props.useFeature;
    const opt = this.options['use-feature'];

    let isReset = false;
    let isGrid = false;
    let isModules = false;
    if (feat) {
      isReset = feat.indexOf('bs-reset') >= 0;
      isGrid = feat.indexOf('bs-grid') >= 0;
      isModules = feat.indexOf('bs-modules') >= 0;
    } else if (opt) {
      isReset = opt.indexOf('bs-reset') >= 0;
      isGrid = opt.indexOf('bs-grid') >= 0;
      isModules = opt.indexOf('bs-modules') >= 0;
    }

    this.fs.copyTpl(
      this.templatePath('src_scss_require.scss'),
      this.destinationPath('src/scss/require.scss'),
      {
        includeReset: isReset,
        includeGrid: isGrid,
        includeModules: isModules
      }
    );

    this.fs.copy(
      this.templatePath('src_scss_01-settings_00_grid.scss'),
      this.destinationPath('src/scss/01-settings/00_grid.scss')
    );

    this.fs.copy(
      this.templatePath('src_scss_02-tools_mixin-a11y.scss'),
      this.destinationPath('src/scss/02-tools/mixin-a11y.scss')
    );

    this.fs.copy(
      this.templatePath('src_scss_03-generic_generic.scss'),
      this.destinationPath('src/scss/03-generic/generic.scss')
    );

    this.fs.copy(
      this.templatePath('src_scss_04-elements_tags.scss'),
      this.destinationPath('src/scss/04-elements/tags.scss')
    );

    this.fs.copy(
      this.templatePath('src_scss_05-objects_utils.scss'),
      this.destinationPath('src/scss/05-objects/utils.scss')
    );

    this.fs.copy(
      this.templatePath('src_scss_07-trumps__hotfixes.scss'),
      this.destinationPath('src/scss/07-trumps__hotfixes.scss')
    );
  }

  _optionalVRT() {
    let isVRT = false;
    if (this.props.useVRT || this.options['use-vrt']) {
      isVRT = true;
    }
  }

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
   * Rename and copy script dummies
   * @private
   */
  _writingScript() {
    this.fs.copy(
      this.templatePath('src_script_body.js'),
      this.destinationPath('src/script/body.js')
    );
    this.fs.copy(
      this.templatePath('src_script_head.js'),
      this.destinationPath('src/script/head.js')
    );
  }

  /**
   * Rename and copy markup
   * @private
   */
  _writingMarkup() {
    this.fs.copy(
      this.templatePath('src_markup_layouts_default.html'),
      this.destinationPath('src/markup/layouts/default.html')
    );
    this.fs.copy(
      this.templatePath('src_markup_pages_index.html'),
      this.destinationPath('src/markup/pages/index.html')
    );
    this.fs.copy(
      this.templatePath('src_markup_partials_area_footer.html'),
      this.destinationPath('src/markup/partials/area/footer.html')
    );
    this.fs.copy(
      this.templatePath('src_markup_partials_area_header.html'),
      this.destinationPath('src/markup/partials/area/header.html')
    );
  }

  /**
   * Copy gulpfile to project root
   * @private
   */
  _writingGulp() {
    this.fs.copy(this.templatePath('Gulpfile.js'), this.destinationPath('Gulpfile.js'));
    this.fs.copy(
      this.templatePath('felab_gulp_template.js'),
      this.destinationPath('felab/gulp/template.js')
    );
  }

  /**
   * Copy gruntfile to project root
   * @private
   */
  _writingGrunt() {
    this.fs.copy(this.templatePath('Gruntfile.js'), this.destinationPath('Gruntfile.js'));
    this.fs.copy(
      this.templatePath('felab_custom_server.js'),
      this.destinationPath('felab/custom/server.js')
    );
    this.fs.copy(
      this.templatePath('felab_custom_testconfig.js'),
      this.destinationPath('felab/custom/testconfig.js')
    );
    this.fs.copy(
      this.templatePath('felab_default_aliases.yaml'),
      this.destinationPath('felab/default/aliases.yaml')
    );
    this.fs.copy(
      this.templatePath('felab_default_concat.js'),
      this.destinationPath('felab/default/concat.js')
    );
    this.fs.copy(
      this.templatePath('felab_default_copy.js'),
      this.destinationPath('felab/default/copy.js')
    );
    this.fs.copy(
      this.templatePath('felab_default_clean.js'),
      this.destinationPath('felab/default/clean.js')
    );
    this.fs.copy(
      this.templatePath('felab_default_config.json'),
      this.destinationPath('felab/default/config.json')
    );
    this.fs.copy(
      this.templatePath('felab_default_exec.js'),
      this.destinationPath('felab/default/exec.js')
    );
    this.fs.copy(
      this.templatePath('felab_default_postcss.js'),
      this.destinationPath('felab/default/postcss.js')
    );
    this.fs.copy(
      this.templatePath('felab_default_sass.js'),
      this.destinationPath('felab/default/sass.js')
    );
    this.fs.copy(
      this.templatePath('felab_default_sassdoc.js'),
      this.destinationPath('felab/default/sassdoc.js')
    );
    this.fs.copy(
      this.templatePath('felab_user_aliases.yaml'),
      this.destinationPath('felab/user/aliases.yaml')
    );
  }

  /**
   * Build project folders
   * @private
   */
  _buildFolders() {
    const markup = [
      'helpers',
      'layouts',
      'pages',
      'partials/areas',
      'partials/elements',
      'partials/modules',
      'partials/structure'
    ];
    const scss = [
      '01-settings',
      '02-tools',
      '03-generic',
      '04-elements',
      '05-objects',
      '06-components__areas',
      '06-components__elements',
      '06-components__modules',
      '06-components__structure',
      '07-trumps__browser',
      '07-trumps__cms-styles',
      '07-trumps__script-styles',
      'fonts',
      'img'
    ];

    mkdirp('src/script');
    mkdirp('_devel');
    mkdirp('app');
    mkdirp('doc');
    mkdirp('tmp');
    mkdirp('test');
    this._buildPathFromArray('src/markup/', markup);
    this._buildPathFromArray('src/scss/', scss);
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
