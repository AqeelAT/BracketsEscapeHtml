/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

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
                editor.document.replaceRange(result, selection.start, selection.end);
            });
            
        });
    }
    
        var MY_COMMAND_ID = "aqeelat.escapeHtml";   // package-style naming to avoid collisions
    CommandManager.register("Escape HTML", MY_COMMAND_ID, handleEscaping);

    var menu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    menu.addMenuItem(MY_COMMAND_ID);
});