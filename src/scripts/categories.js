const URL = "http://localhost:3000/api/categories";

const getData = () => {
    const handleResponse = response => {
        const { ok } = response;

        if (!ok) {
            throw new Error(`Could not fetch data from '${URL}'`);
        }

        return response.json();
    };

    return fetch(URL, {
        method: "GET",
    }).then(handleResponse);
};

getData().then(({ result }) => {
    const element = document.querySelector("#categories");

    const html = result.map(item => {
        return `
            <tr>
                <td>${item.category}</td>
                <td>${item.videos}</td>
            </tr>
        `;
    });

    element.innerHTML = html.join("");
});
