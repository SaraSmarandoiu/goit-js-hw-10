
axios.defaults.headers.common["x-api-key"] = "live_xh4w0q7jsl9Ux8FibgZyng6pbDg9J7xFzyivCuvjmiaWvgcFYJIco7aSFlL4Ux9d";

export async function fetchBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    const breeds = response.data;
    return breeds;
  } catch (error) {
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    const cat = response.data[0];
    return cat;
  } catch (error) {
    throw error;
  }
}
