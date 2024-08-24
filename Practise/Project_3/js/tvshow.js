const form = document.querySelector("#searchForm");
const formInput = document.querySelector("#keyword");
const submit = document.querySelector("#search");
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchKeyword = formInput.value;
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchKeyword}`);
    // console.log(searchKeyword);
    const newImage = document.createElement('IMG');
    newImage.src = res.data[0].show.image.medium;
    document.body.append(newImage);
    formInput.value = '';

})
