# Auto-Collapse Explorer

Auto-Collapse Explorer attempts to keep the Explorer neat and tidy by only
expanding the directory of the file that is currently in focus. All directories
are closed.

## Features

When focus changes to a new document, that document is revealed in the file tree
and all other open folders are collapsed.

The extension only does this while the Explorer is the visible sidebar view. If
you are working in Search, Source Control, or with the sidebar closed entirely,
it stays out of your way.

Thanks for trying out this extension! Hope you enjoy!

## Required setup: keep the "Auto-Collapse Explorer" section expanded

After installing, you will see an empty **Auto-Collapse Explorer** section at the
bottom of the Explorer. **Leave it expanded.** If you collapse it, the extension
stops collapsing folders.

### Why this is necessary

Revealing a file in the Explorer forces the Explorer open, which is what used to
yank you out of Search or Source Control every time you clicked a result. To
avoid that, the extension has to know whether the Explorer is already on screen
before it does anything.

VS Code offers no API for that. Extensions cannot ask which sidebar view is
visible, and the request for one
([microsoft/vscode#48198](https://github.com/microsoft/vscode/issues/48198),
[microsoft/vscode#255992](https://github.com/microsoft/vscode/issues/255992)) has
not been implemented.

What an extension *can* check is whether one of its own views is visible. So this
extension contributes an empty section to the Explorer and uses it as a probe: if
that section is visible, the Explorer is open. VS Code reports a section as not
visible when it is collapsed, which is why collapsing it makes the extension go
quiet. The section is empty by design and takes up a single header row.

## Contributing

Pull requests are always welcome. VS Code is not my everyday editor and
maintenance/enhancement of this extension suffers.
