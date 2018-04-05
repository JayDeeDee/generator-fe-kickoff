/**
 * Base BackstopJS Configuration
 */
const config = {
    'id': 'fe-lab',
    'baseUrl': 'http://localhost:8081', // no BackstopJS config property, used to build the final 'url' property
    'viewports': [],
    'scenarios': [],
    // 'onBeforeScript': 'backstop_onBefore.js',
    // 'onReadyScript': 'backstop_onReady.js',
    'fileNameTemplate': '{configId}_{scenarioLabel}_{selectorIndex}_{selectorLabel}_{viewportLabel}',
    'paths': {
        'bitmaps_reference': 'test/visual-regression-tests/screenshots/reference',
        'bitmaps_test': 'test/visual-regression-tests/screenshots/test',
        'html_report': 'test/visual-regression-tests/_report'
    },
    'report': [ 'browser' ],
    'engine': 'chrome',
    'resembleOutputOptions': { // see: https://huddle.github.io/Resemble.js/
        'largeImageThreshold': 0,
        // 'errorType': 'movement',
        // 'errorPixel': 'movement',
        // 'transparency': 0.3,
    },
    'asyncCaptureLimit': 10,
    'asyncCompareLimit': 100,
    'debug': false,
    'debugWindow': false
};


/**
 * Default configuration for every single scenario, can be overwritten in each single scenario definition
 */
const defaultScenarioConfiguration = {
    'components': [], // no BackstopJS config property, used to allow filtering by components
    'delay': 50,
    'hideSelectors': [],
    'removeSelectors': [],
    'misMatchThreshold': 0.1,
    'requireSameDimensions': true
};


/**
 * Load scenarios
 */
// load scenarios for templates
const scenarios = require(__dirname + '/scenarios/templates.js');

// load scenarios_components/*/* excluding *_onBefore.js and *_onReady.js
const fs = require('fs');
const path = require('path');
const findFilesRecursive = dir => {
    return fs.statSync(dir).isDirectory()
        ? Array.prototype.concat(...fs.readdirSync(dir).map(f => findFilesRecursive(path.join(dir, f))))
        : dir;
};
findFilesRecursive(__dirname + '/scenarios/components/').forEach(file => {
    if (file.match(/_on(Before|Ready).js$/)) {
        return;
    }

    let componentScenario = require(file);
    componentScenario.url = file.replace(__dirname + '/scenarios/components/', '/markup/components/').replace(/.js$/, '.html');

    scenarios.push(componentScenario);
});


/**
 * Get and parse --components and --viewports cli arguments for later filtering
 */
const parseArgs = require('minimist');
const argsOptions = parseArgs(process.argv.slice(2), {
    string: ['components', 'viewports'],
    alias: {
        components: [ 'filterComponents', 'filter-components' ],
        viewports: [ 'filterViewports', 'filter-viewports' ],
    },
    default: {
        components: '',
        viewports: ''
    }
});

const filterComponentsSet = argsOptions.components === '' ? new Set() : new Set(argsOptions.components.split(',').map(c => c.trim()).filter(c => c !== ''));
const filterViewportsSet = argsOptions.viewports === '' ? new Set() : new Set(argsOptions.viewports.split(',').map(v => v.trim()).filter(v => v !== ''));


/**
 * Prepare and filter final scenarios configuration
 */
scenarios.forEach(scenario => {
    // merge in default scenario configuration
    scenario = {...defaultScenarioConfiguration, ...scenario};

    // prefix every relative url in scenarios with baseUrl property
    if (scenario.url.startsWith('/')) {
        scenario.url = config.baseUrl + scenario.url;
    }

    // filter components given by cli argument option
    if (!filterComponentsSet.size || 'components' in scenario
        && [...scenario.components].filter(c => filterComponentsSet.has(c)).length // intersection
    ) {
        config.scenarios.push(scenario);
    }
});


/**
 * Filter viewports given by cli argument option
 */
const viewports = require(__dirname + '/backstop_viewports.js');
config.viewports = filterViewportsSet.size ? viewports.filter(v => filterViewportsSet.has(v.label)) : viewports;


module.exports = config;
