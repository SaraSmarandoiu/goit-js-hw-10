
axios.defaults.headers.common['x-api-key'] =
  'live_xh4w0q7jsl9Ux8FibgZyng6pbDg9J7xFzyivCuvjmiaWvgcFYJIco7aSFlL4Ux9d';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}
function showCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" />
    <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
    <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
  `;
  catInfo.style.display = 'block';
}
async function fetchBreeds() {
  try {
    showLoader(); 

    const response = await axios.get('https://api.thecatapi.com/v1/breeds');

    const breeds = response.data;

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    hideLoader(); 
  } catch (error) {
    showError(); 
    hideLoader();
  }
}


async function fetchCatByBreed(breedId) {
  try {
    showLoader();

    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );

    const cat = response.data[0];

    showCatInfo(cat); 
    hideLoader(); 
    hideError()
  } catch (error) {
    showError();
    hideLoader();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  fetchBreeds();
});
breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  fetchCatByBreed(breedId);
});
