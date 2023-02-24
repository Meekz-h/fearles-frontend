window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/conferences/"
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        const conferenceSelect = document.getElementById("conference");
        for (const conference of data.conferences) {
            const option = document.createElement("option");
            option.value = conference.id;
            option.innerHTML = conference.name;
            conferenceSelect.appendChild(option)
        }
    }

    const formTag = document.getElementById("create-presentation-form")
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const confrenceId = JSON.parse(json).conference
        const presentationUrl = `http://localhost:8000/api/conferences/${confrenceId}/presentations/`
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newConference = await response.json();
            console.log(newConference)
        }
    })
} )
