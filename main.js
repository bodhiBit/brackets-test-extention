/*jshint browser:true, jquery:true, devel:true */
/*global define, brackets */

/**
 * test
 */
define(function (require, exports, module) {
  "use strict";
  var CommandManager      = brackets.getModule("command/CommandManager"),
      Menus               = brackets.getModule("command/Menus"),
      ProjectManager      = brackets.getModule("project/ProjectManager"),
      FileSystem          = brackets.getModule("filesystem/FileSystem");

  function init() {
    var menu = Menus.addMenu("Test", "test-menu", Menus.AFTER, Menus.AppMenuBar.FILE_MENU);
    CommandManager.register("Create new something...", "test-create", doCreate);
    menu.addMenuItem("test-create");
    CommandManager.register("Rename something...", "test-rename", doRename);
    menu.addMenuItem("test-rename");
  }
  
  function doCreate() {
    // Now create something..!
    // Linux skips the renaming, despite that skipRename == false..
    ProjectManager.createNewItem(
      ProjectManager.getProjectRoot(),
      "Something_new.txt",
      false,
      false
    ).done(function(entry){
      // This DOES seem to work in Linux.. strangely enough..
      ProjectManager.renameItemInline(entry);
      console.log("Congratulations! You just created something! ^_^");
    });
  }
  
  function doRename() {
    var item;
    
    // find and set item to rename
    if (ProjectManager.getSelectedItem()) {
      item = ProjectManager.getSelectedItem();
    } else {
      window.alert("Nothing to rename.. :(");
      return;
    }
    
    // Now rename something..!
    console.log("Trying to rename something...");
    // This does NOT seem to work in Linux..
    ProjectManager.renameItemInline(item).done(function(){
      // renameItemInline should return a promise..
      window.alert("This alert will never get shown... :(");
    });
  }

  init();
});
