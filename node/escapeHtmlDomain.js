/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global */

(function () {
    "use strict";
    
    var escapeHtml = require('escape-html');
    
    /**
     * Initializes the test domain with several test commands.
     * @param {DomainManager} domainManager The DomainManager for the server
     */
    function init(domainManager) {
        if (!domainManager.hasDomain("escape-html")) {
            domainManager.registerDomain("escape-html", {major: 1, minor: 0});
        
            domainManager.registerCommand(
                "escape-html",       // domain name
                "escapeHtml",    // command name
                escapeHtml,   // command handler function
                false,          // this command is synchronous in Node
                "Escapes HTML characters.",
                [{name: "text", // parameters
                    type: "string",
                    description: "The text to be escape."}],
                [{name: "text", // return values
                    type: "string",
                    description: "The escaped text."}]
            );
        }
    }
    
    exports.init = init;
    
}());