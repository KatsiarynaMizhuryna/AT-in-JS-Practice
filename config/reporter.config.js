import HtmlReporter from 'wdio-html-nice-reporter';

exports.htmlReporter = new HtmlReporter({
  debug: false,
  outputDir: './reports/html',
  filename: 'report.html',
  reportTitle: 'Test Report',
  showInBrowser: false,
  collapseTests: false,
  useOnAfterCommandForScreenshot: false,
});

exports.specReporter = {
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
};
