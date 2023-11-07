const { readFileSync } = require("fs");
const { join } = require("path");

module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    // "@semantic-release/release-notes-generator",
    [
      "@semantic-release/release-notes-generator",
      {
        writerOpts: {
          commitPartial: readFileSync(
            join(__dirname, "./configs/commit.hbs"),
            "utf-8"
          ),

          /* commitPartial:
            "*{{#if scope}} **{{scope}}:**\n{{~/if}} {{#if subject}}\n  {{~subject}}\n{{~else}}\n  {{~header}}\n{{~/if}}\n\n{{~!-- commit link --}}{{~#if hash}} {{#if @root.linkReferences~}}\n  ([{{shortHash}}](\n  {{~#if @root.repository}}\n    {{~#if @root.host}}\n      {{~@root.host}}/\n    {{~/if}}\n    {{~#if @root.owner}}\n      {{~@root.owner}}/\n    {{~/if}}\n    {{~@root.repository}}\n  {{~else}}\n    {{~@root.repoUrl}}\n  {{~/if}}/\n  {{~@root.commit}}/{{hash}}))\n{{~else}}\n  {{~shortHash}}\n{{~/if}}{{~/if}}\n\n{{~!-- commit references --}}\n{{~#if references~}}\n  , closes\n  {{~#each references}} {{#if @root.linkReferences~}}\n    [\n    {{~#if this.owner}}\n      {{~this.owner}}/\n    {{~/if}}\n    {{~this.repository}}{{this.prefix}}{{this.issue}}]({{@root.host}}/{{@root.owner}}/_workitems/edit/{{this.issue}})\n  {{~else}}\n    {{~#if this.owner}}\n      {{~this.owner}}/\n    {{~/if}}\n    {{~this.repository}}{{this.prefix}}{{this.issue}}\n  {{~/if}}{{/each}}\n{{~/if}}{{#if body}}\n{{body}}{{/if}}\n",
             */
        },
      },
    ],
    "@semantic-release/npm",
    [
      "@semantic-release/github",
      {
        assets: {
          path: "./build.tar.gz",
          name: "@arijitcodes-test-semantic-release_v${nextRelease.version}.tgz",
          label: "Build v${nextRelease.version}",
        },
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package*.json"],
      },
    ],
  ],
};
