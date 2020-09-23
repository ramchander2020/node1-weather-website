const path = require ('path')
const express = require ('express')
const hbs = require ('hbs')
const geocode = require ('./utils/geocode.js')
const forecast = require ('./utils/forecast.js')

const app = express()

//path to express config
const publicDirectoryPath = path.join (__dirname , '../public')
const viewsPath = path.join (__dirname , '../templates/views')
const partialsPath = path.join (__dirname , '../templates/partials')

console.log (publicDirectoryPath)

// setting hbs and views path
app.set ('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials (partialsPath)


app.use (express.static (publicDirectoryPath))

app.get('', (req, res)=>{

    res.render ('index', {

        title: 'Weather App',
        name: 'Ram C'

    })

})


app.get('/about', (req, res)=>{

    res.render ('about', {

        title: 'about page Ram',
        name: 'Ram C'

    })

})

app.get('/help', (req, res)=>{

    res.render ('help', {

        title: 'Help Page',
        helpText: 'How can I help you??',
        name: 'Ram C'

    })

})
// app.get('/help', (req, res)=>{

//         app.use (express.static (publicDirectoryPath+'/help.html'))
//        // res.send (publicDirectoryPath+'/help.html')

// })


// app.get('/about', (req, res)=>{

//     res.send ('<h1>About Page</h1>')

// })

app.get('/weather', (req, res)=>{

    //console.log (req.query.address)

    if(!req.query.address){

        res.send ({

            error : 'Please provide valid address'

        })
    }
    else{
        const address = req.query.address
        geocode.geoCode(address, (error, {longitude, latitude, location}={})=>{

            if (error){
                 return res.send ({ error })
            }
        
            forecast.forecast ({longitude,latitude, location}, (error, forecastdata) =>{
        
                if (error){
                    return res.send ({ error })
                 }
                //console.log('Errors', error )
                // console.log(location )
                // console.log('Data', forecastdata )

                res.send ({

                    location,
                    forecastdata
        
                })
            })
            
        })
       


    }


})


app.get('/help/*', (req, res)=>{

    res.render('404', {

        title: 'Error Page',
        errorMessage: 'Sorry for the inconvenience But Help article not found',
        name: 'Ram C'
    })
})
app.get('*', (req, res)=>{

    res.render('404', {

        title: 'Error Page',
        errorMessage: '404 Error - Sorry for the inconvenience But This page is not found',
        name: 'Ram C'
    })
})

app.listen (3000, ()=>{

    console.log ('Web Server is running at port 3000')
})

