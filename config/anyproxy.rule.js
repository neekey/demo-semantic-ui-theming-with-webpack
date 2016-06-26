/*
 read the following wiki before using rule file
 https://github.com/alibaba/anyproxy/wiki/What-is-rule-file-and-how-to-write-one
 */
var productionConfig = require( './anyproxy.rule.json' ).production;

module.exports = {

    summary:function(){
        return "reverse proxy - assign an IP adress for some request";
    },

    replaceRequestOption : function(req,option){
        var newOption = option;

        console.log( option );

        if( newOption.hostname == productionConfig.hostname &&
            newOption.port == productionConfig.port &&
            newOption.path.indexOf( productionConfig.path ) >= 0 &&
            newOption.path != productionConfig.path
        ){
            newOption.port = '8080';
            newOption.hostname = 'localhost';
            newOption.path = newOption.path.replace( productionConfig.path, '/' );
        }

        console.log( 'new options!!!', option );
        return newOption;
    }

};