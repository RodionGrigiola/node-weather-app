const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.p1')
const messageTwo = document.querySelector('.p2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';

    fetch(`http://127.0.0.1:3000/weather?address=${location}`)
    .then((response) => {
    response.json().then((data) => {
        console.log(data)
        if(data.error) console.log(data.error)
        else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
    .catch((e) => {
        messageOne.textContent = "Can't find the location, try another one"
        messageTwo.textContent = ''
    }) 
})

})

 
