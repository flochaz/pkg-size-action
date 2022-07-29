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
	const {
		data,
	} = await octokit.pulls.get({
		owner,
		repo,
		pull_number: prNumber,
	});

	log.endGroup();

	return data;
}

export default getPrObject;
