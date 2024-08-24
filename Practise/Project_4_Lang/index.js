const franc = require('franc');
const langs = require('langs');
const colors = require('colors');

const lang = franc(process.argv[2]);


try {
    const language = langs.where("3", lang);
    console.log(language.name.green);

}
catch (err) {
    console.log('Sorry, Language not detected!!!'.red);
    console.log('Try again, Later sometime.'.yellow);
}






