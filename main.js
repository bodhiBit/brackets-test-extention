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
    var dest;
    
    // find and set destination folder
    if (ProjectManager.getSelectedItem()) {
      if (ProjectManager.getSelectedItem().isDirectory) {
        dest = ProjectManager.getSelectedItem().fullPath;
      } else {
        dest = ProjectManager.getSelectedItem().parentPath;
      }
    } else {
      dest = ProjectManager.getProjectRoot().fullPath;
    }
    
    // Now create something..!
    ProjectManager.createNewItem(
      FileSystem.getDirectoryForPath(dest),
      "Something new.txt",
      false,
      false
    ).done(function(entry){
      ProjectManager.renameItemInline(entry);
      console.log("Congratulations! You just created something! ^_^");
    });
  }
  
  function doRename() {
    var item;
    
    // find and set destination folder
    if (ProjectManager.getSelectedItem()) {
      item = ProjectManager.getSelectedItem();
    } else {
      window.alert("Nothing to rename.. :(");
      return;
    }
    
    // Now rename something..!
    console.log("Trying to rename something...");
    ProjectManager.renameItemInline(item).done(function(){
      console.log("Congratulations! You just renamed something! ^_^");
    });
  }

  init();
});
