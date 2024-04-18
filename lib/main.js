import * as core from '@actions/core';
import { getLinkInfoFromFiles, collectBrokenLinks, createAnnotations, } from './lib';
async function run({ GITHUB_WORKSPACE }) {
    try {
        const baseUrl = core.getInput('baseUrl', { required: true });
        const files = core
            .getInput('files')
            .split(' ')
            // Only support .mdx files at this time
            // TODO: Extend to provide support for more filetypes
            .filter((x) => x.endsWith('.mdx'));
        const whitelist = core
            .getInput('whitelist')
            .split(/\r?\n/)
            .filter(Boolean);
        const filesWithLinks = getLinkInfoFromFiles(GITHUB_WORKSPACE, files);
        if (!filesWithLinks.length)
            return;
        const brokenLinks = await collectBrokenLinks(baseUrl, filesWithLinks, whitelist);
        if (!brokenLinks.length)
            return;
        const annotations = createAnnotations(brokenLinks);
        core.setOutput('annotations', annotations);
        core.setFailed(`${brokenLinks.length} broken links found!
---------

${annotations.map((x) => `Filename: ${x.path} :: ${x.message}`).join('\n')}`);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
run(process.env);
