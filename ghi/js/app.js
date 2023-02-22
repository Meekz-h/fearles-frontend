function createCard(name, description, pictureUrl,starts,ends) {
    return `
        <div class="card shadow-lg d-grid mt-5">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text text-justify">${description}</p>
            </div>
            <div class="card-footer">${starts} - ${ends}</div>
        </div>
    `;
  }



  window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
      } else {
          const data = await response.json();
          let i = 0
          for (let conference of data.conferences) {
              i++;
                  const detailUrl = `http://localhost:8000${conference.href}`;
                  const detailResponse = await fetch(detailUrl);
                  const column = document.querySelector(`#col-${i}`)
                  if (detailResponse.ok) {
                      const details = await detailResponse.json();
                      const title = details.conference.name;
                      const description = details.conference.description;
                      const pictureUrl = details.conference.location.picture_url;
                      const starts = new Date(details.conference.starts).toDateString();
                      const ends = new Date(details.conference.ends).toDateString();
                      const html = createCard(title, description, pictureUrl,starts,ends);
                      column.innerHTML += html;
              }
              if (i >= 3) {
                  i = 0;
              }
              }
          }

      }
     catch (e) {
      // Figure out what to do if an error is raised
    }

  });
