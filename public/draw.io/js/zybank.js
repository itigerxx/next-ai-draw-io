/**
 * Zybank custom shape library
 *
 * Draw.io v31.4.6
 *
 */
(function()
{
    /**
     * Adds the Zybank palette.
     *
     * This follows the same Sidebar API used by Draw.io's
     * built-in palettes such as General, Basic, AWS, Web Icons, etc.
     */
    Sidebar.prototype.addZybankPalette = function()
    {
        var fns = [];

        fns.push(
            this.createVertexTemplateEntry(
                'shape=image;html=1;image=/zybank-icons/computer.svg;aspect=fixed;',
                80,
                80,
                '',
                'Computer',
                true,
                null,
                'zybank computer desktop client application'
            )
        );

        fns.push(
            this.createVertexTemplateEntry(
                'shape=image;html=1;image=/zybank-icons/database.svg;aspect=fixed;',
                80,
                80,
                '',
                'Database',
                true,
                null,
                'zybank database storage data persistent'
            )
        );

        fns.push(
            this.createVertexTemplateEntry(
                'shape=image;html=1;image=/zybank-icons/mobile.svg;aspect=fixed;',
                80,
                80,
                '',
                'Mobile',
                true,
                null,
                'zybank mobile phone device application'
            )
        );

        fns.push(
            this.createVertexTemplateEntry(
                'shape=image;html=1;image=/zybank-icons/server.svg;aspect=fixed;',
                80,
                80,
                '',
                'Server',
                true,
                null,
                'zybank server backend service'
            )
        );

        fns.push(
            this.createVertexTemplateEntry(
                'shape=image;html=1;image=/zybank-icons/user.svg;aspect=fixed;',
                80,
                80,
                '',
                'User',
                true,
                null,
                'zybank user customer operator actor'
            )
        );

        fns.push(
            this.createVertexTemplateEntry(
                'shape=image;html=1;image=/zybank-icons/web-server.svg;aspect=fixed;',
                80,
                80,
                '',
                'Web Server',
                true,
                null,
                'zybank web server web application frontend'
            )
        );

        /**
         * Draw.io's native API for creating a palette.
         *
         * id:
         *   zybank
         *
         * title:
         *   Zybank
         *
         * expanded:
         *   false = collapsed by default
         */
        this.addPaletteFunctions(
            'zybank',
            'Zybank',
            false,
            fns
        );
    };

    /**
     * Hook Draw.io's palette initialization.
     *
     * Important:
     *
     * Sidebar.refresh() -> Sidebar.init() -> initPalettes()
     *
     * Therefore hooking initPalettes means Zybank is also recreated
     * when Draw.io refreshes the sidebar.
     */
    var originalInitPalettes = Sidebar.prototype.initPalettes;

    Sidebar.prototype.initPalettes = function()
    {
        // First build all native Draw.io palettes.
        originalInitPalettes.apply(this, arguments);

        // Then append our private Zybank palette.
        this.addZybankPalette();
    };
})();