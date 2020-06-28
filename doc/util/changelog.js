#!/usr/bin/env node

const child = require('child_process');
const fs = require('fs');

const output = child
	.execSync('git log --format=%B%H__DELIMIT__')
	.toString('utf-8');

const commitList = output
	.split('__DELIMIT__\n')
	.map((commit) => {
		const [message, sha] = commit.split('\n');
		return { sha, message };
	})
	.filter((commit) => Boolean(commit.sha));

const currentChangelog = fs.readFileSync('./CHANGELOG.md', 'utf-8');
const currentVersion = require('./package.json').version;

let newChangelog = `# Version: ${currentVersion} (${
	new Date().toISOString().split('T')[0]
})\n\n`;

const commitsByScope = {
	chore: [],
	feat: [],
	fix: [],
	refactor: [],
	style: []
};

const commitScopes = Object.keys(commitsByScope).sort();

const commitTypes = ['dev', 'doc', 'ops', 'src', 'test'];

commitList.forEach((commit) => {
	const commitSha = commit.sha.substring(0, 6);
	const commitLink = `https://github.com/abbotto/elemint/commit/${commit.sha}`;

	commitTypes.forEach((type) => {
		commitScopes.forEach((scope) => {
			const commitMsg = commit.message.replace(
				`${type} (${scope}): `,
				`${type}: `
			);

			if (commit.message.includes(`${type} (${scope}): `)) {
				commitsByScope[scope].push(
					`* ${commitMsg} ([${commitSha}](${commitLink}))`
				);
			}
		});
	});
});

commitScopes.forEach((scope) => {
	if (commitsByScope[scope].length) {
		newChangelog += `## ${scope.toUpperCase()}\n`;

		commitsByScope[scope].sort().forEach((item) => {
			newChangelog += `${item}\n`;
		});
	}
});

if (!currentChangelog.includes(`Version: ${currentVersion} (`)) {
	fs.writeFileSync('./CHANGELOG.md', `${newChangelog}${currentChangelog}`);
} else {
	console.log('The version has not changed - skipping the changelog generation');
}
