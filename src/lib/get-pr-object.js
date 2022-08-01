import { getOctokit } from '@actions/github';
import * as log from './log.js';

async function getPrObject({
	token,
	owner,
	repo,
	prNumber,
}) {
	log.startGroup('Get PR object');

	const octokit = getOctokit(token);

	log.info('Getting PR object');
	try {
		const {
			data,
		} = await octokit.pulls.get({
			owner,
			repo,
			pull_number: prNumber,
		});

		log.endGroup();

		return data;
	} catch (error) {
		log.error(error);
		log.endGroup();

		throw error;
	}
}

export default getPrObject;
