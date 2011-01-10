;(function($) {
    window._gaq = window._gaq || [];

    function ucfirst(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    $.ga = function( options ) {
        if ( $.type( options ) === "object" ) {
            $.each( options, function( option, value ) {
                var set = '_set' + ucfirst( option );
                
                $.ga.push(set, value);
            });
        } else {
            $.ga.push('_setAccount', options);
        }
        $.ga.trackPageview();
        $.ga._getScript();
        return $.ga;
    };
    
    $.each( 'trackPageview trackEvent'.split(/\s+/), function( idx, command ) {
        $.ga[ command ] = function(  ) {
            return this.push( '_' + command, [].slice.call( arguments ) );
        };
    });

    $.extend( $.ga, {
        debug: true,
        push: function() {
            var args = [].concat( arguments ),
                data = $.map( args, function( value ) { 
                    return $.type( value ) === 'boolean' ? ( value ? 'true' : 'false' ) : value;
                });
            if ( data.length < 1 ) return this;
            if ( this.debug ) {
                console.log( "ga.push", data );
            }
            _gaq.push( data );
            return this;
        },
        _getScript: function() {
            $.ajax({
                url: "//google-analytics.com/ga.js",
                dataType: "script",
                cache: true,
                success: function() {
					if ( this.debug ) {
						console.log('$.ga - Analytics Script loaded');
					}
                    // never load this again...
                    $.ga._getScript = $.noop;
                }
            });
        }
    });
})(jQuery);