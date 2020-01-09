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

        template = template.replace("{{src}}", item.thumbnail);
        template = template.replace("{{alt}}", item.title);
        template = template.replace("{{rank}}", rank);
        template = template.replace("{{title}}", item.title);
        template = template.replace("{{views}}", item.views);
        template = template.replace("{{likes}}", item.likes);
        template = template.replace("{{dislikes}}", item.dislikes);
        template = template.replace("{{comments}}", item.comments);

        return template;
    });

    element.innerHTML = html.join("");
};

getData().then(displayData);
