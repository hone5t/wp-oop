<?php
/**
 * Default config settings
 *
 * Enter any WordPress config settings that are default to all environments
 * in this file. These can then be overridden in the environment config files.
 * 
 * Please note if you add constants in this file (i.e. define statements) 
 * these cannot be overridden in environment config files.
 * 
 * @package    Studio 24 WordPress Multi-Environment Config
 * @version    1.0
 * @author     Studio 24 Ltd  <info@studio24.net>
 */
  

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'HYMy2B(mPgXYXV&d^9XT:yq`6w=KCiDffGAs/3%<hx6!x(qMe:6!}5Hz|-1w=_Px');
define('SECURE_AUTH_KEY',  'rs^feDWe~nu<wvN*JvUm|[=J2Z16fp^fb&&u&;k([`@52{+8%s5_xDoS!2(>&-+9');
define('LOGGED_IN_KEY',    'eQ9FyREDE4mpxiGH=q5FXnl{LC^f|`tDmnniT]*5H.1(xsG2P=KWzq<}7s`xEia/');
define('NONCE_KEY',        ',zvH1#R3<MMkHM2SrHxxzmMQx83iC2mN,mghe(&k30/9u&t86c,cSPbs$=FX+QcO');
define('AUTH_SALT',        '-r9ZHTi%4X@Z:G(bJXHqP8vUg:TuAc*e`AHX,.]7CB_p,hzx3u/Vme2E/aQfnV3+');
define('SECURE_AUTH_SALT', '[8wd~am(V>Yo0K{v+{y7xoFMms0Gm7oeS+8)awR[{K9]S1]9D;d(&W.md[Q`/]SV');
define('LOGGED_IN_SALT',   'M3F7tH>r>Zl.xPkOn<@{1|;f V^6&=/l7W~P&4e_nY^jpFrP+5lwV.xe~Oda<F9z');
define('NONCE_SALT',       'QkU#C7ef&^%+=!LQVyV6!mbA6uxv@veH]@6K%i oAn`@DLig$2,H929bX!cHTpOS');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * Increase memory limit. 
 */
define('WP_MEMORY_LIMIT', '64M');
