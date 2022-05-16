import { exec as _exec } from '@actions/exec';

async function exec(command, options) {
	let stdout = '';
	let stderr = '';

	const startTime = Date.now();
	let exitCode = '127';
	try {
		exitCode = await _exec(command, null, {
			...options,
			silent: true,
			listeners: {
				stdout(data) {
					stdout += data.toString();
				},
				stderr(data) {
					stderr += data.toString();
				},
			},
		});
	} catch (error) {
		stderr += error.toString();
	}

	const duration = Date.now() - startTime;

	return {
		exitCode,
		duration,
		stdout,
		stderr,
	};
}

export default exec;
