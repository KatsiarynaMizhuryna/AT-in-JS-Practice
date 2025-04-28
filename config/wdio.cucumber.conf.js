import HtmlReporter from 'wdio-html-nice-reporter';
import { existsSync, mkdirSync } from 'fs';

const browserName = process.argv[4] || 'chrome';

export const config = {
  runner: 'local',
  specs: ['./../src/tests/features/app.feature'],
  exclude: [],
  maxInstances: 10,

  capabilities: [
    {
      browserName: browserName,
      'goog:chromeOptions': {
        args: ['--headless', '--no-sandbox'],
      },
    },
  ],

  logLevel: 'error',
  baseUrl: 'https://practicesoftwaretesting.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'cucumber',

  reporters: [
    [
      'spec',
      {
        showPreface: false,
        showPassed: true,
        showFailed: true,
        showSkipped: true,
        showStandardError: true,
        symbols: {
          passed: '[PASS]',
          failed: '[FAIL]',
          skipped: '[SKIP]',
        },
      },
    ],
    [
      HtmlReporter,
      {
        debug: false,
        outputDir: './reports/html/cucumber',
        filename: 'report.html',
        reportTitle: 'Cucumber Test Report',
        showInBrowser: false,
        useOnAfterCommandForScreenshot: false,
      },
    ],
  ],

  cucumberOpts: {
    require: ['./src/tests/step-definitions/steps.js'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    name: [],
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
    formatOptions: {
      colorsEnabled: true,
      theme: {
        'feature keyword': ['magenta', 'bold'],
        'scenario keyword': ['cyan', 'bold'],
        'step keyword': ['blue', 'bold'],
        passed: ['green', 'bold'],
        failed: ['red', 'bold'],
        pending: ['yellow', 'bold'],
      },
    },
    format: ['pretty'],
  },
  afterTest: async (test, { error }) => {
    if (error) {
      const fileName = `${test.title}.png`;
      const dirPath = './screenshots/';

      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, {
          recursive: true,
        });
      }

      await browser.saveScreenshot(dirPath + fileName);
    }
  },
};
