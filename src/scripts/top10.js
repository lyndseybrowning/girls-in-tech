const URL = "http://localhost:3000/api/top10";

const getData = (category = "views") => {
    const handleResponse = response => {
        const { ok } = response;

        if (!ok) {
            throw new Error(`Could not fetch data from '${URL}'`);
        }

        return response.json();
    };

    return fetch(`${URL}?category=${category}`, {
        method: "GET",
    }).then(handleResponse);
};

const displayData = ({ result }) => {
    const element = document.querySelector("#top10");

    const html = result.map((item, index) => {
        const rank = index + 1;

        let template = document.querySelector("#template").innerHTML;

        template = template.replace("{{videoId}}", item.videoId);
        template = template.replace("{{src}}", item.thumbnail);
        template = template.replace("{{alt}}", item.title);
        template = template.replace("{{rank}}", `${rank}.`);
        template = template.replace("{{title}}", item.title);
        template = template.replace("{{views}}", item.views);
        template = template.replace("{{likes}}", item.likes);
        template = template.replace("{{dislikes}}", item.dislikes);
        template = template.replace("{{comments}}", item.comments);

        return template;
    });

    element.innerHTML = html.join("");
};

const categories = document.querySelectorAll("[data-category]");

getData().then(displayData);

categories.forEach(category => {
    const selectedClassName = "stat-group__item--selected";

    category.addEventListener("click", e => {
        const button = e.target;
        const selectedCategory = document.querySelector(
            `.${selectedClassName}`,
        );

        // remove selected class from existing category
        selectedCategory.classList.remove(selectedClassName);
        // add selected class to the clicked button
        button.parentElement.classList.add(selectedClassName);

        getData(button.dataset.category).then(displayData);
    });
});
