document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab-menu__tab");
    const contents = document.querySelectorAll(".tab-menu__content");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function() {           
            tabs.forEach(t => t.classList.remove("tab-menu__tab--active"));
            contents.forEach(c => c.classList.remove("tab-menu__content--active"));
            tab.classList.add("tab-menu__tab--active");
            contents[index].classList.add("tab-menu__content--active");
        });
    });
});
