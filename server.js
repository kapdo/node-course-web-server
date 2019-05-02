const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method}  ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
            console.log('unable to appen to server log');
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('mainteance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/help', (req, res) => {

})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Super Page handle bar',
        currentYear: new Date().getFullYear()
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Super Page handle bar',
        currentYear: new Date().getFullYear(),
        note: 'Welcome Home'
    });
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to Hndle request'
    });
});

app.listen(3000, () => {
    console.log('server is up');
});