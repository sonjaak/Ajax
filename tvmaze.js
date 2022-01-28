'use strict';

const form = document.getElementsByTagName("form")[0];
console.log('form?', form);

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('form not sent to tvmaze?');
  const searchTerm = document.getElementsByName('q')[0];
  console.log('input search', searchTerm.value);
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm.value}`);
  if (!response.ok) {
    console.log('some network problem?', response);
    return;
  }
  const shows = await response.json();
  console.log('shows', shows);

  const result = document.getElementById('result');
  result.innerHTML = '';
  shows.forEach(item => {
    const show = item.show;
    console.log('one show', show);
    let node = `
<article>
  <h3>${show.name}</h3>`;
    if(show.image && show.image.medium) {
      node += `<img src="${show.image.medium}" alt="">`;
    }
    node += `
  ${show.summary}
  <h4>Genres</h4>
  <ul>
  `;
    if(show.genres) {
      show.genres.forEach(genre => {
        node += `<li>${genre}</li>`;
      });
    }
    node += `
  </ul>
  <p>Official website: <a href="${show.officialSite}">${show.officialSite}</a></p>
</article>
    `;
    result.innerHTML += node;
  });
});
