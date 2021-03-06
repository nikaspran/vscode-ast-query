import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'bdd',
    color: true,
  });

  const testsRoot = path.resolve(__dirname, '..', '..');

  return new Promise((resolve, reject) => {
    glob('**/**.spec.js', { cwd: testsRoot }, (globError, files) => {
      if (globError) {
        reject(globError);
        return;
      }

      // Add files to the test suite
      files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

      try {
        // Run the mocha test
        mocha.run((failures) => {
          if (failures > 0) {
            reject(new Error(`${failures} tests failed.`));
          } else {
            resolve();
          }
        });
      } catch (mochaError) {
        console.error(mochaError); // eslint-disable-line no-console
        reject(mochaError);
      }
    });
  });
}
