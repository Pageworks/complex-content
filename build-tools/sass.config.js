const sass = require('node-sass');
const glob = require("glob");
const fs = require('fs');
const rimraf = require("rimraf");
const chalk = require('chalk');

compileSASS();

function compileSASS(){
    console.log(chalk.white('Compiling SASS'));

    // Get all the SCSS files from the templates directory
    const templateFiles = glob.sync('./craft/templates/**/*.scss');

    if(fs.existsSync('./craft/public/assets/styles')){
        rimraf.sync('./craft/public/assets/styles');
    }

    fs.mkdirSync('./craft/public/assets/styles');

    // Create a timestamp for cache busting
    const timestamp = Date.now().toString().match(/.{8}$/g)[0];

    // Write the timestamp to Crafts general config file
    var data = fs.readFileSync('./craft/config/general.php', 'utf-8');
    var newValue = data.replace(/'cssCacheBustTimestamp'.*/g, "'cssCacheBustTimestamp' => '"+ timestamp +"',");
    fs.writeFileSync('./craft/config/general.php', newValue, 'utf-8');

    // Generate the files
    templateFiles.forEach((file)=>{
        sass.render(
            {
                file: file,
                outputStyle: 'compressed',
                includePaths: ['craft/utils/styles/settings', 'craft/utils/styles/tools']
            },
            function(error, result){
                if (error) {
                    console.log(chalk.hex('#f57b7b').bold(`SASS Compile Error:`), chalk.white(`${ error.message } at line`), chalk.yellow.bold(error.line), chalk.hex('#ffffff').bold(error.file));
                }else{
                    const fileName = result.stats.entry.match(/[ \w-]+?(?=\.)/gi)[0].toLowerCase();
                    if(fileName){
                        const newFile = './craft/public/assets/styles/' + fileName + '.' + timestamp + '.css';
                        console.log(chalk.hex('#ffffff').bold(file), chalk.hex('#8cf57b').bold(' [compiled]'));
                        fs.writeFile(newFile, result.css.toString(), function (err) {
                            if(err){ throw err };
                        });
                    }else{
                        console.log('Something went wrong with the file name of ' + result.stats.entry);
                    }
                }
            }
        );
    });
}
