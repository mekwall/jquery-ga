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
        $.ga.trackPageview(null);
        $.ga._getScript();
        return $.ga;
    };
    
    $.each( 'trackPageview trackEvent'.split(/\s+/), function( idx, command ) {
        $.ga[ command ] = function( values ) {
            return this.push( '_' + command, values);
        };
    });

    $.extend( $.ga, {
        debug: true,
        push: function(option, value) {
            var data = [],
                valType = $.type(value);
            data.push(option);
            if (valType == "undefined") {
                return this;
            } else if (valType == "boolean") {
                value = (value === true) ? "true" : "false";
            } else if (valType == "array") {
                data = data.concat(value);
            } else if (value != null) {
                data.push(value);
            }
            if (this.debug) {
                console.log("ga.push", data);
            }
            _gaq.push(data);
            return this;
        },
        _getScript: function() {
            $.ajax({
                url: "//google-analytics.com/ga.js",
                dataType: "script",
                cache: true,
                success: function() {
                    // never load this again...
                    $.ga._getScript = $.noop;
                }
            });
        }
    });
})(jQuery);