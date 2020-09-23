console.log ("Javascript file is loaded")



const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')

weatherform.addEventListener ('submit', (e)=>{

    e.preventDefault()
    const address = search.value
    console.log (address)

    messageOne.textContent = 'Loading.......'

    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent =  ''

    fetch('/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent = data.error
            console.log (data.error)
        }
        else{
            console.log (data)
            //const dataJSONObject = JSON.parse (data)
            const location = data.location
             //const temperature = data.temperature
            // const feelslike = JSON.parse(data.feelslike);
           // const weather_descriptions = data.weather_descriptions[0];
           messageOne.textContent = ''
            messageTwo.textContent = 'Location : '+ location
            messageThree.textContent = 'It Feels like : '+ data.forecastdata.feelslike
            messageFour.textContent = 'Temperature  : '+ data.forecastdata.temperature
            messageFive.textContent = 'Weather Description  : ' + data.forecastdata.weather_descriptions[0]
            
           
        }
    })
})

})
