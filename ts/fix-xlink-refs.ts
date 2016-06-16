
export const fixXlinkHrefs = ():void =>
{
    let baseUrl:string = window.location.href.replace(window.location.hash, "");

    [].slice.call(document.querySelectorAll("use[*|href]"))

    /**
     * Filter out all elements whose namespaced `href` attribute doesn't
     * start with `#` (i.e. all non-relative IRI's)
     *
     * Note: we're assuming the `xlink` prefix for the XLink namespace!
     */
        .filter(function(element) { return (element.getAttribute("xlink:href").indexOf("#") === 0); })

        /**
         * Prepend `window.location` to the namespaced `href` attribute value,
         * in order to make it an absolute IRI
         *
         * Note: we're assuming the `xlink` prefix for the XLink namespace!
         */
        .forEach(function(element) { element.setAttribute("xlink:href", baseUrl + element.getAttribute("xlink:href")); });
};