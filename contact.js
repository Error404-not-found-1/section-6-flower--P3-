document.addEventListener("DOMContentLoaded", function () {
  const sidebarMenu = document.getElementById("sidebarMenu");
  const content = document.querySelector("body"); 

  function updateMargin() {
    if (sidebarMenu.classList.contains("show")) {
      content.style.marginLeft = "220px";
    } else {
      content.style.marginLeft = "0";
    }
  }

  // Check once on load
  updateMargin();

  // Then observe future changes
  const observer = new MutationObserver(updateMargin);
  observer.observe(sidebarMenu, { attributes: true, attributeFilter: ["class"] });
});

const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }

}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});