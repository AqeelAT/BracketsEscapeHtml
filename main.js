/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
    "use strict";


    var CommandManager = brackets.getModule("command/CommandManager"),
        NodeDomain     = brackets.getModule("utils/NodeDomain"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        Menus          = brackets.getModule("command/Menus"),
        EditorManager  = brackets.getModule('editor/EditorManager');

    
    var escape = new NodeDomain("escape-html", ExtensionUtils.getModulePath(module, "node/escapeHtmlDomain"));

    // Function to run when the menu item is clicked

    function handleEscaping() {
        let editor = EditorManager.getFocusedEditor();
        let selections = editor.getSelections();

        selections.forEach((selection)=>{
            let text = editor.document.getRange(selection.start, selection.end);
            if (!text || !text.length) return;
            escape.exec("escapeHtml", text).done((result) => {
                text = result;
                console.log(text);
                editor.document.replaceRange(text, selection.start, selection.end);
            });
            
        });
    }
    
    
    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "aqeelat.escaper";   // package-style naming to avoid collisions
    CommandManager.register("Escaper", MY_COMMAND_ID, handleEscaping);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    menu.addMenuItem(MY_COMMAND_ID);
    
    // We could also add a key binding at the same time:
    //menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-W");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
});