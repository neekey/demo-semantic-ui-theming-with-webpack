var FS = require( 'fs' );
var Path = require( 'path' );
var Mustache = require( 'mustache' );
var _ = require( 'lodash' );
var RouteConfig = require( './route.json' );

var pagesPathRoot = Path.resolve( __dirname, '../app/pages' );
var targetPath = Path.resolve( pagesPathRoot, './' + RouteConfig.targetName + '.js' );
var Template = FS.readFileSync( Path.resolve( __dirname, './route.mustache' ) ).toString();

var states = [];

FS.readdirSync( pagesPathRoot ).forEach(function( path ){

    var currentPagePath = Path.resolve( pagesPathRoot, path );

    if( FS.statSync( currentPagePath ).isDirectory() ){

        var state = {
            name: path,
            url: path == RouteConfig.home ? '/' : '/' + path,
            type: RouteConfig.futureStateType
        };

        var configPath = Path.resolve( currentPagePath, RouteConfig.configFile );
        if( FS.existsSync( configPath ) ){
            var routeConfig = require( configPath );
            states.push( _.extend( state, routeConfig ) );
        }
        else {
            states.push( state );
        }
    }
});

FS.writeFileSync( targetPath, Mustache.render( Template, {
    states: states
}) );