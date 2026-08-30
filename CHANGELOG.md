# Change Log

All notable changes to the "auto-collapse-explorer" extension will be documented
in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how
to structure this file.

## [Unreleased]

## [1.0.0] - 2019-08-20

- Initial release

## [1.0.1] - 2021-02-19

### Fixed

- Fixed bug causing split views, such as source control diffs, to be closed.
- Fixed bug causing non-file editors to be closed.
- Fixed misleading README.md.

## [1.0.2] - 2021-05-20

### Security

- Bumped `lodash`.
- Bumped `vsce`.

## [1.0.3] - 2022-07-08

### Security

- Resolved issues raised by `npm audit`.

### Changed

- Migrated project to TypeScript.

## [1.1.0] - 2026-08-29

### Fixed

- The Explorer is no longer forced open and focus is no longer stolen when
  switching files from Search, Source Control, or with the sidebar hidden.
  Collapsing now only runs while the Explorer is the visible sidebar view.
  ([#1](https://github.com/LukeGeneva/vscode-auto-collapse-explorer/issues/1),
  [#7](https://github.com/LukeGeneva/vscode-auto-collapse-explorer/issues/7),
  [#9](https://github.com/LukeGeneva/vscode-auto-collapse-explorer/issues/9),
  [#20](https://github.com/LukeGeneva/vscode-auto-collapse-explorer/issues/20),
  [#24](https://github.com/LukeGeneva/vscode-auto-collapse-explorer/issues/24),
  [#25](https://github.com/LukeGeneva/vscode-auto-collapse-explorer/issues/25))
- Opening a file in one window no longer pulls focus away from another window.
  ([#23](https://github.com/LukeGeneva/vscode-auto-collapse-explorer/issues/23))

### Added

- An empty "Auto-Collapse Explorer" section in the Explorer. It is how the
  extension detects whether the Explorer is visible, since VS Code exposes no
  API for that. It must stay expanded for the extension to work. See the README
  for details.
