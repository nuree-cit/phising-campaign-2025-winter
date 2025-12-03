/* 
    Name:      script.js

    Purpose:   handling form sumbission and communicating with db
    Author:    nuna ⑨
    Created:   12/1/2025 
*/

// get form data and post the json to db. re-route the user to the lesson.html
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("fake_form");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form));

        try {
            const response = await fetch("/api/phish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                form.reset();
                window.location.href = "/static/lesson.html";

            }
        } catch (err) {
            console.error(err);
        }
    });
});
