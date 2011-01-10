(function($) {
    window._gaq = window._gaq || [];

    function ucfirst(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    jQuery.ga = function( options ) {
        if ( jQuery.type( options ) === "object" ) {
            jQuery.each( options, function( option, value ) {
                var set = '_set' + ucfirst( option );
                
                jQuery.ga.push(set, value);
            });
        } else {
            jQuery.ga.push('_setAccount', options);
        }
        jQuery.ga.trackPageview(null);
        jQuery.ga._getScript();
        return jQuery.ga;
    };
    
    jQuery.each( 'trackPageview trackEvent'.split(/\s+/), function( idx, command ) {
        jQuery.ga[ command ] = function( values ) {
            return this.push( '_' + command, values);
        };
    });

    $.extend( jQuery.ga, {
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
                data.join(value);
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
                    jQuery.ga._getScript = jQuery.noop;
                }
            });
        }
    });
})(jQuery);