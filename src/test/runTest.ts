import * as path from 'path';

import { runTests, SilentReporter } from '@vscode/test-electron';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');

		// Download VS Code, unzip it and run the integration test
		// SilentReporter avoids EPIPE crashes when the download progress bar
		// writes to a closed stdout pipe in CI.
		await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
			reporter: new SilentReporter(),
		});
	} catch (err) {
		console.error('Failed to run tests', err);
		process.exit(1);
	}
}

main();
