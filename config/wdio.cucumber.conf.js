import { ReportAggregator } from 'wdio-html-nice-reporter';
import { existsSync, mkdirSync } from 'fs';

const browserName = process.argv[4] || 'chrome';
let reportAggregator;

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

  logLevel: 'info',
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
      'html-nice',
      {
        outputDir: './reports/html-reports/',
        filename: 'report.html',
        reportTitle: 'Test Report Title',
        linkScreenshots: true,
        showInBrowser: true,
        collapseTests: false,
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
  afterScenario: async (_, result) => {
    if (result.error) {
      const fileName = `${new Date().getTime()}.png`;
      const dirPath = './reports/html-reports/';

      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, {
          recursive: true,
        });
      }

      await browser.saveScreenshot(dirPath + fileName);
    }
  },
  onPrepare: async function (config, capabilities) {
    reportAggregator = new ReportAggregator({
      outputDir: './reports/html-reports/',
      filename: 'master-report.html',
      reportTitle: 'Master Report',
      browserName: capabilities.browserName,
      collapseTests: true,
    });
    await reportAggregator.clean();
  },

  onComplete: async function () {
    await reportAggregator.createReport();
  },
};
