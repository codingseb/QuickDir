# Quick Dir

Allow to quickly navigate in the OS folders with the keyboard. (For Keyboard Geeks)

## Supported platforms

Currently works perfectly only on Windows.

Mac OS and Linux are in progress.

## How to use it

In the field that appears on the top left corner of your screen start typing to navigate in your folders.
The auto-completion help you to go faster.

You can create favorites (shortcuts) to a directory with the 2 following syntaxes

`path/to/the/dir>shortcut`

or 

`shortcut=path/to/the/dir`

Press Enter to validate. Now When you type the name of the shortcut the autocompletion suggest you the corresponding path.

### Hotkeys

You can use the following hotkeys :
* F5 : Show the current directory in explorer
* F6 : Open a console (cmd) on the current directory
* Escape : Clear the field or if it is already cleared, minimize the application.

## How to launch Quick Dir
Make a local copy of the repository:

`git clone https://github.com/codingseb/QuickDir.git`

Then in the local folder of the project:

`npm install`

You can run it with :

`npm start` -> (Make a `electron .` in the background)

If you're in [Visual Studio Code](https://code.visualstudio.com) you can do it with hotkey:

On Window/Linux: `Ctrl+Shift+B` 

On Mac OS: `Cmd+Shift+B`

## For building a executable

`npm run release`

## License
The MIT license (See [LICENSE.md](LICENSE.md))