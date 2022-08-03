import fs from 'fs';
import path from 'path';
import { rmRF } from '@actions/io';
import * as log from './log.js';
import exec from './exec.js';

async function npmCi({ cwd } = {}) {
	if (fs.existsSync('node_modules')) {
		log.info('Cleaning node_modules');
		await rmRF(path.join(cwd, 'node_modules'));
	}

	const options = {
		cwd,
		ignoreReturnCode: true,
	};

	if (!fs.existsSync('package-lock.json')) {
		log.error('No lock file detected. Installing dependencies with npm');
		throw new Error('No lock file detected. Installing dependencies with npm');
	}

	const installCommand = 'npm ci --foreground-scripts';
	const { exitCode, stdout, stderr } = await exec(installCommand, options);
	if (exitCode > 0) {
		throw new Error(`${stderr}\n${stdout}`);
	}
}

export default npmCi;
