/**
 * Gulpfile.
 * based on  Ahmad Awais (@ahmadawais) work on https://github.com/ahmadawais/WPGulp
 **/
// START Editing Project Variables.
// Project related.
var project                 = 'wp-oop'; // Project Name.
var projectURL              = 'www.wp-oop.local'; // Project URL. Could be something like localhost:8888.
var productURL              = './'; // Theme/Plugin URL. Leave it like it is, since our gulpfile.js lives in the root folder.

var srcLocation             = './content/themes/'+project+'/';

var styleSRC                = srcLocation + 'assets/sass/style.scss'; // Path to main .scss file.
var styleDestination        = srcLocation; // Path to place the compiled CSS file.

// JS Vendor related.
// jquery should load first then everything else
// if you have more things that you need to priorities you can add them here as an array ['file1','file2',jsVendorSRC]

var jquerySRC               = srcLocation + 'assets/js/vendor/jquery.js';
var jsCustomSRC             = srcLocation + 'assets/js/*.js'; // Path to JS custom scripts folder.
var jsVendorSRC             = srcLocation + 'assets/js/vendor/*.js';

var jsSRC             = [jquerySRC , jsVendorSRC ,jsCustomSRC]; // Path to JS vendor folder.
var jsDestination     = './static/js/'; // Path to place the compiled JS custom scripts file.
var jsFile            = 'app'; // Compiled JS custom file name.

// Images related.
var imagesSRC               = srcLocation + 'assets/img/raw/**/*.{png,jpg,gif,svg}'; // Source folder of images which should be optimized.
var imagesDestination       = srcLocation + 'assets/img/'; // Destination folder of optimized images. Must be different from the imagesSRC folder.

// Watch files paths.
var styleWatchFiles         = srcLocation + 'assets/sass/**/*.scss'; // Path to all *.scss files inside css folder and inside them.
var jsWatchFiles            = srcLocation + 'assets/js/**/*.js'; // Path to all vendor JS files.
var projectPHPWatchFiles    = srcLocation + '**/*.php'; // Path to all PHP files.
var projectTwigWatchFiles   = srcLocation + '**/*.twig'; // Path to all TWIG files.


// Browsers you care about for autoprefixing.
// Browserlist https        ://github.com/ai/browserslist
const AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 45',
    'safari >= 8',
    'opera >= 23',
    'ios >= 8',
    'android >= 5',
    'bb >= 10'
  ];

// STOP Editing Project Variables.

/**
 * Load Plugins.
 *
 * Load gulp plugins and assing them semantic names.
 */
var gulp            = require('gulp'); // Gulp of-course

var browserSync     = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronised browser testing.
var reload          = browserSync.reload; // For manual browser reload.

var gulpLoadPlugins = require('gulp-load-plugins');
var plugins         = gulpLoadPlugins();




/**
 * Task: `browser-sync`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 *
 * This task does the following:
 *    1. Sets the project URL
 *    2. Sets inject CSS
 *    3. You may define a custom port
 *    4. You may want to stop the browser from openning automatically
 */
gulp.task( 'browser-sync', function() {
  browserSync.init( {

    // For more options
    // @link http://www.browsersync.io/docs/options/

    // Project URL.
    proxy: projectURL,

    // `true` Automatically open the browser with BrowserSync live server.
    // `false` Stop the browser from automatically opening.
    open: true,

    // Inject CSS changes.
    // Commnet it to reload browser for every CSS change.
    injectChanges: true,

    // Use a specific port (instead of the one auto-detected by Browsersync).
    // port: 7000,

  } );
});


/**
 * Task: `styles`.
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    3. Writes Sourcemaps for it
 *    4. Autoprefixes it and generates style.css
 *    5. Renames the CSS file with suffix .min.css
 *    6. Minifies the CSS file and generates style.min.css
 *    7. Injects CSS or reloads the browser via browserSync
 */
 gulp.task('styles', function () {
  plugins.util.log('hello'+styleSRC);
    gulp.src( styleSRC )
    .pipe( plugins.sourcemaps.init() )
    .pipe( plugins.sass( {
      errLogToConsole: true,
      outputStyle: 'compact',
      //outputStyle: 'compressed',
      // outputStyle: 'nested',
      // outputStyle: 'expanded',
      precision: 10
    } ) )
    .on('error', console.error.bind(console))
    .pipe( plugins.sourcemaps.write( { includeContent: false } ) )
    .pipe( plugins.sourcemaps.init( { loadMaps: true } ) )
    .pipe( plugins.autoprefixer( AUTOPREFIXER_BROWSERS ) )

    .pipe( plugins.sourcemaps.write ( styleDestination ) )
    .pipe( plugins.lineEndingCorrector() ) // Consistent Line Endings for non UNIX systems.
    .pipe( gulp.dest( styleDestination ) )

    .pipe( plugins.filter( '**/*.css' ) ) // Filtering stream to only css files
    .pipe( plugins.mergeMediaQueries( { log: true } ) ) // Merge Media Queries only for .min.css version.

    .pipe( browserSync.stream() ) // Reloads style.css if that is enqueued.

    .pipe( plugins.rename( { suffix: '.min' } ) )
    .pipe( plugins.uglifycss( {
      maxLineLen: 10
    }))
    .pipe( plugins.lineEndingCorrector() ) // Consistent Line Endings for non UNIX systems.
    .pipe( gulp.dest( styleDestination ) )

    .pipe( plugins.filter( '**/*.css' ) ) // Filtering stream to only css files
    .pipe( browserSync.stream() )// Reloads style.min.css if that is enqueued.
    .pipe( plugins.notify( { message: 'TASK: "styles" Completed! 💯', onLast: true } ) )
 });


 /**
  * Task: `vendorJS`.
  *
  * Concatenate and uglify vendor JS scripts.
  *
  * This task does the following:
  *     1. Gets the source folder for JS vendor files
  *     2. Concatenates all the files and generates vendors.js
  *     3. Renames the JS file with suffix .min.js
  *     4. Uglifes/Minifies the JS file and generates vendors.min.js
  */
 gulp.task( 'js', function() {
  gulp.src( jsSRC )
    .pipe( plugins.concat( jsFile + '.js' ) )
    .pipe( plugins.lineEndingCorrector() ) // Consistent Line Endings for non UNIX systems.
    .pipe( gulp.dest( jsDestination ) )
    .pipe( plugins.rename( {
      basename: jsFile,
      suffix: '.min'
    }))
    .pipe( plugins.uglify() )
    .pipe( plugins.lineEndingCorrector() ) // Consistent Line Endings for non UNIX systems.
    .pipe( gulp.dest( jsDestination ) )
    .pipe( plugins.notify( { message: 'TASK: "Js" Completed! 💯', onLast: true } ) );
 });



 /**
  * Task: `images`.
  *
  * Minifies PNG, JPEG, GIF and SVG images.
  *
  * This task does the following:
  *     1. Gets the source of images raw folder
  *     2. Minifies PNG, JPEG, GIF and SVG images
  *     3. Generates and saves the optimized images
  *
  * This task will run only once, if you want to run it
  * again, do it with the command `gulp images`.
  */
 gulp.task( 'images', function() {
  gulp.src( imagesSRC )
    .pipe( plugins.imagemin( {
          progressive: true,
          optimizationLevel: 3, // 0-7 low-high
          interlaced: true,
          svgoPlugins: [{removeViewBox: false}]
        } ) )
    .pipe(gulp.dest( imagesDestination ))
    .pipe(plugins.notify( { message: 'TASK: "images" Completed! 💯', onLast: true } ) );
 });



 /**
  * Watch Tasks.
  *
  * Watches for file changes and runs specific tasks.
  */
gulp.task( 'default', ['styles', 'js' ,'images', 'browser-sync'], function () {
  gulp.watch( projectPHPWatchFiles, reload ); // Reload on PHP file changes.
  gulp.watch( projectTwigWatchFiles, reload ); // Reload on TWIG file changes.
  gulp.watch( styleWatchFiles, [ 'styles' ] ); // Reload on SCSS file changes.
  gulp.watch( [jsWatchFiles], [ 'js', reload ] ); // Reload on js file changes.
 });
