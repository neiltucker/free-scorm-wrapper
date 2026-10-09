/**
 * Courseware Studio - Free SCORM Wrapper API Helper
 * Supports both SCORM 1.2 (API) and SCORM 2004 (API_1484_11)
 * https://coursewarestudio.ai
 */

var SCORM_API_Helper = {
  api: null,
  is2004: false,
  initialized: false,

  // Find the SCORM API in parent windows
  findAPI: function(win) {
    var findAttempts = 0;
    while ((win.API == null) && (win.API_1484_11 == null) && (win.parent != null) && (win.parent != win)) {
      findAttempts++;
      if (findAttempts > 50) return null;
      win = win.parent;
    }
    return win.API_1484_11 || win.API || null;
  },

  // Initialize communication
  init: function() {
    if (this.initialized) return true;
    
    var api = this.findAPI(window);
    if (!api && window.opener) {
      api = this.findAPI(window.opener);
    }

    if (api) {
      this.api = api;
      // API_1484_11 exists only in SCORM 2004
      this.is2004 = typeof api.Initialize === "function";
      
      var success = false;
      if (this.is2004) {
        success = api.Initialize("") === "true";
      } else if (typeof api.LMSInitialize === "function") {
        success = api.LMSInitialize("") === "true";
      }
      
      this.initialized = success;
      return success;
    }
    console.warn("SCORM API not found. Running in offline/standalone mode.");
    return false;
  },

  // Set SCORM data
  setValue: function(element, value) {
    if (!this.initialized || !this.api) return false;
    
    var success = false;
    if (this.is2004) {
      success = this.api.SetValue(element, value) === "true";
      this.api.Commit("");
    } else {
      // Map basic SCORM 2004 elements to SCORM 1.2 equivalents if needed
      var mappedElement = element;
      if (!this.is2004) {
        if (element === "cmi.completion_status" || element === "cmi.success_status") {
          mappedElement = "cmi.core.lesson_status";
        } else if (element === "cmi.session_time") {
          mappedElement = "cmi.core.session_time";
        }
      }
      success = this.api.LMSSetValue(mappedElement, value) === "true";
      this.api.LMSCommit("");
    }
    return success;
  },

  // Get SCORM data
  getValue: function(element) {
    if (!this.initialized || !this.api) return "";
    
    if (this.is2004) {
      return this.api.GetValue(element);
    } else {
      var mappedElement = element;
      if (element === "cmi.completion_status" || element === "cmi.success_status") {
        mappedElement = "cmi.core.lesson_status";
      }
      return this.api.LMSGetValue(mappedElement);
    }
  },

  // Complete the course
  complete: function() {
    if (this.is2004) {
      this.setValue("cmi.completion_status", "completed");
      this.setValue("cmi.success_status", "passed");
    } else {
      this.setValue("cmi.core.lesson_status", "completed");
    }
  },

  // Terminate communication
  terminate: function() {
    if (!this.initialized || !this.api) return false;
    
    var success = false;
    if (this.is2004) {
      success = this.api.Terminate("") === "true";
    } else if (typeof api.LMSFinish === "function") {
      success = this.api.LMSFinish("") === "true";
    }
    
    this.initialized = false;
    return success;
  }
};
