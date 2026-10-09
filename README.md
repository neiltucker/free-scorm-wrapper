# Free SCORM Wrapper Template (SCORM 1.2 & SCORM 2004)

A clean, lightweight, platform-neutral template to package interactive HTML5 courseware for deployment in any compliant Learning Management System (LMS).

[![Courseware Studio Promo Banner](https://coursewarestudio.ai/logos/CoursewareStudio-Logo-Dark.svg)](https://coursewarestudio.ai)

---

## 🚀 Overview

This repository provides a production-tested foundation for wrapping web pages, slide decks, simulations, or games into standard LMS-ready course packages. It supports automatic API discovery for:
*   **SCORM 1.2** (utilizing `API` and `LMSInitialize` mapping)
*   **SCORM 2004** (utilizing `API_1484_11` and `Initialize` interfaces)

---

## 🛠️ How to Use

1.  **Clone or Download this Repository:**
    ```bash
    git clone https://github.com/neiltucker/free-scorm-wrapper.git
    ```
2.  **Add Your Content:**
    Place your slide directories, web resources, style files, or interactive assets in the same folder as `index.html`.
3.  **Include the API Wrapper:**
    Add the `scorm_api_wrapper.js` script to your page headers:
    ```html
    <script src="scorm_api_wrapper.js"></script>
    ```
4.  **Interface with the LMS:**
    Initialize communication, set scores, mark progress, and terminate the session:
    ```javascript
    // Initialize session (scans frames for standard LMS hooks)
    SCORM_API_Helper.init();

    // Mark completion
    SCORM_API_Helper.complete();

    // Save a score (85% correct)
    if (SCORM_API_Helper.is2004) {
      SCORM_API_Helper.setValue("cmi.score.scaled", "0.85");
    } else {
      SCORM_API_Helper.setValue("cmi.core.score.raw", "85");
    }

    // Always cleanly terminate when the user leaves the course
    SCORM_API_Helper.terminate();
    ```
5.  **Zip the Directory:**
    Select `imsmanifest.xml`, `index.html`, `scorm_api_wrapper.js`, and all associated content. Compress them directly into a root ZIP file. *Do not compress the outer parent folder.* Upload this ZIP directly to your LMS!

---

## ⚡ Tired of Packaging and Content Writing?

If manually creating manifests, editing slides, writing student manuals, compiling PowerPoint files, and recording module intro narrations is taking weeks of your time, try **Courseware Studio**.

Create fully compliant enterprise courseware instantly:
*   **Syllabus Planning (100% Free):** Describe your topic, define your objectives, and download a proposal-ready PDF with zero commitment.
*   **Core LMS Exports:** Standard-compliant HTML5, SCORM 1.2, SCORM 2004, xAPI, and cmi5 packages ready to load into any LMS.
*   **Instructor-Ready Materials:** Instantly generated Student Manuals, Instructor Guides, Prep Guides, Assessments, PowerPoint slide decks, and Quick Reference cards.
*   **Self-Paced eLearning Add-on:** Studio-quality voiceover narration, subtitles, interactive slides, and viewport-fitted layout optimizations out of the box.

👉 **[Generate your Free Course Syllabus in 2 Minutes at CoursewareStudio.ai](https://coursewarestudio.ai)**

---

## 📝 License
This wrapper boilerplate is licensed under the MIT License. Feel free to use, modify, and distribute it in your commercial L&D projects. Created in partnership with [Courseware Studio](https://coursewarestudio.ai).
