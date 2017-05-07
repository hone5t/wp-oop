# Wordpress OOP 

This project aim to simplify wordpress development its based on couple 
of repositry that i combine and modify to make them work together


## Getting Started

first git clone the project
```
git clone https://github.com/hone5t/wp-oop.git
```
download wordpress (https://wordpress.org/download/)
download and install composer (https://getcomposer.org/download/)
download and install npm (https://nodejs.org/en/download/)

### Prerequisites
if you installed the requiremtns above then you need to download the require
modules
to check if npm & gulp installed run the follwoing command
```
npm -v
gulp -v
```
to check commposer just make sure that you have composer.phar in your working directory


### Installing
if everything installed ok then run the following commands
```
php composer.phar install
npm install
gulp
```
proceed to install wordpress once installed delete wp-config file and move wp to new directory name it wp.
create new production configuration

```
cp config/wp-config.staging.php config/wp-config.development.php
```

## Deployment

make sure you have change the config files you have 
staging:for staging site
development: for local development site
production: for live site
default : this will run no matter what environment you are in
config.env: this will route to the correct config base on $hostname
```
switch ($hostname) {
    case 'www.wp-oop.local':
        define('WP_ENV', 'development');
        break;
    
    case 'staging.wp-oop.com':
        define('WP_ENV', 'staging');
        break;
    case 'www.wp-oop.com':
    default: 
        define('WP_ENV', 'production');
}
```


## License

This project is licensed under the MIT License - see the [MIT](http://opensource.org/licenses/MIT) file for details


## Acknowledgments

* Based on [timber starter](https://github.com/timber/starter-theme).
* Based on [_S](http://underscores.me/).
* normalize.css http://necolas.github.io/normalize.css/, (C) 2012-2016 Nicolas Gallagher and Jonathan Neal, [MIT](http://opensource.org/licenses/MIT)
* Configuration based on [wordpress-multi-env-config](https://github.com/studio24/wordpress-multi-env-config.git)
* Gulp Configuration based on [WPGulp](https://github.com/ahmadawais/WPGulp)

