const form = document.querySelector("#form");

// This script is only needed on the contact page.
// On other pages there is no #form, so we do nothing and avoid console errors.
if (form) {
  const launchBtn = document.querySelector("#launch-btn");

  // Decorative ship animation element inside the form
  const shipEl = document.createElement("img");
  shipEl.classList.add("ship-anim");
  shipEl.alt = "";
  form.appendChild(shipEl);

  const showShipAnim = () => {
    shipEl.setAttribute("src", "./img/ship-anim.gif");

    setTimeout(() => {
      shipEl.removeAttribute("src");
    }, 8000);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    launchBtn.setAttribute("disabled", true);
    launchBtn.style.opacity = "0.8";

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        // fetch does not fail on 404/500, so check the status ourselves
        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }

        showShipAnim();
        form.reset(); // clears all fields at once
        launchBtn.removeAttribute("disabled");

        setTimeout(() => {
          launchBtn.style.opacity = "1";
        }, 8000);
      })
      .catch((error) => {
        console.log("Sending form failed", error);
        // let the user try again
        launchBtn.removeAttribute("disabled");
        launchBtn.style.opacity = "1";
      });
  });
}