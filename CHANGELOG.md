## [1.4.1](https://github.com/arijitcodes/ultralogger/compare/v1.4.0...v1.4.1) (2023-11-07)


### Bug Fixes

✅ **package.json & release.config.cjs:** fixed the GitHub Build Label, Name issue ([449c16a](https://github.com/arijitcodes/ultralogger/commit/449c16a61ef32557ad0b5f19984845c3a5e4293a)), closes [#2](https://github.com/arijitcodes/ultralogger/issues/2)  

- Fixed the Label of GitHub Release in release.config.cjs for semantic-release
- Fixed the Name of
GitHub Release in release.config.cjs for semantic-release
- Fix the Build File Name in package.json
Build Scripts <br/><br/>

# [1.4.0](https://github.com/arijitcodes/ultralogger/compare/v1.3.1...v1.4.0) (2023-11-07)


### Features

✅ **semantic-release:** set up Semantic-Release for Auto Package Build & Release ([b1d148a](https://github.com/arijitcodes/ultralogger/commit/b1d148aef76f97615ac63916a2167e619ad0cc8a)), closes [#1](https://github.com/arijitcodes/ultralogger/issues/1)  

- We setup the semantic-release package and configured our repo to use Conventional Commits using
Commitizen. We Configured semantic-release to release the build automatically to NPM and GitHub,
Generate Release Notes, Update Changelog file, and maintain the Git Tags / Semantic Versioning of
the Package.
- We also setup github Worlflow for the auto NPM release process for semantic-release <br/><br/>
