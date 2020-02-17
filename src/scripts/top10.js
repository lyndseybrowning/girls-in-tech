const URL = "/api/top10";
const activeCls = "btn-interaction--selected";

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

const handleLikeOrDislike = () => {
    const btnInteraction = document.querySelectorAll(".btn-interaction");

    btnInteraction.forEach(btn => {
        btn.addEventListener("click", e => {
            const actions = e.target.closest(".actions");
            const title = e.target.closest("[data-title]").dataset.title;
            const button = e.target.closest(".btn-interaction");
            const isSelected = button.classList.contains(
                "btn-interaction--selected",
            );

            fetch("/api/like", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    liked: button.dataset.like === "true" ? true : false,
                }),
            }).then(() => {
                if (isSelected) return;

                // remove any active classes
                actions.querySelectorAll(".btn-interaction").forEach(btn => {
                    btn.classList.remove(activeCls);
                });

                button.classList.add(activeCls);
            });
        });
    });
};

const displayData = ({ result }) => {
    const element = document.querySelector("#top10");

    const html = result.map((item, index) => {
        const rank = index + 1;
        const isLiked = item.liked === true;
        const isDisliked = item.liked === false;

        let template = document.querySelector("#template").innerHTML;

        template = template.replace("{{videoId}}", item.videoId);
        template = template.replace("{{src}}", item.thumbnail);
        template = template.replace("{{alt}}", item._id);
        template = template.replace("{{rank}}", `${rank}.`);
        template = template.replace(/{{title}}/g, item._id);
        template = template.replace("{{views}}", formatNumber(item.views));
        template = template.replace("{{likes}}", formatNumber(item.likes));
        template = template.replace(
            "{{dislikes}}",
            formatNumber(item.dislikes),
        );
        template = template.replace(
            "{{comments}}",
            formatNumber(item.comments),
        );
        template = template.replace(
            "{{isLiked}}",
            isLiked ? ` ${activeCls}` : "",
        );
        template = template.replace(
            "{{isDisliked}}",
            isDisliked ? ` ${activeCls}` : "",
        );

        return template;
    });

    element.innerHTML = html.join("");

    handleLikeOrDislike();
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
