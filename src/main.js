document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".menu__tab");
    const contents = document.querySelectorAll(".menu__content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove("menu__tab--active"));
            contents.forEach(c => c.classList.remove("menu__content--active"));

            // Add active class to clicked tab and corresponding content
            tab.classList.add("menu__tab--active");
            document.querySelector(`.menu__content[data-content="${tab.dataset.tab}"]`).classList.add("menu__content--active");
        });
    });
});
