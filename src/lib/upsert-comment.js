import { getOctokit } from '@actions/github';
import * as log from './log.js';

async function upsertComment({
	token,
	commentSignature,
	repo,
	prNumber,
	body,
}) {
	log.startGroup('Comment on PR');

	body += `\n\n${commentSignature}`;

	const octokit = getOctokit(token);

	log.info('Posting new comment');
	await octokit.issues.createComment({
		...repo,
		issue_number: prNumber,
		body,
	});

	log.endGroup();
}

export default upsertComment;
