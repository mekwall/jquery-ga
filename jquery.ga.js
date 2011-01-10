(function($) {
    window._gaq = window._gaq || [];
    $.ga = {
        debug: true,
        load: function(options) {
            var account = options;
            if ($.type(options) == "object") {
                account = options.account;
                this.push('_setDomainName', options.domain)
                    .push('_setAllowHash', options.allowHash)
                    .push('_setAllowLinker', options.allowLinker)
                    .push('_setDetectFlash', options.detectFlash)
                    .push('_setDetectTitle', options.detectTitle)
                    .push('_setClientInfo', options.clientInfo);
            }
            return this.push('_setAccount', account)
                .trackPage(null)
                ._getScript();

        },
        trackPage: function(url) {
            return this.push('_trackPageview', url);
        },
        trackEvent: function(event) {
            return this.push('_trackEvent', event);
        },
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
    };
})(jQuery);
