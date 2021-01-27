/**
 * Holds the major routes for the server
 */
export const MAJOR_ROUTES = {
    /**
     * /authorize
     */
    AUTHORIZE: '/authorize',
    /**
     * /brand
     */
    BRAND: '/brand',
    /**
     * /category
     */
    CATEGORY: '/category',
    /**
     * /taxbracket
     */
    TAX_BRACKET: '/taxbracket',
    /**
     * /product
     */
    PROUDCT: '/product',
    /**
     * /stockunit
     */
    STOCK_UNIT: '/stockunit',
    /**
     * /sale
     */
    SALE: '/sale',
    /**
     * /
     */
    HOME: '/',
};

/**
 * Holds all the sub routes for the server
 */
export const SUB_ROUTES = {
    BRAND: {
        /**
         * /getallbrands
         */
        GET_ALL_BRANDS: '/getallbrands',
        /**
         * /getbrand
         */
        GET_BRAND: '/getbrand',
        /**
         * /createbrand
         */
        CREATE_BRAND: '/createbrand',
        /**
         * /deletebrand
         */
        DELETE_BRAND: '/deletebrand',
        /**
         * /updatebrand
         */
        UPDATE_BRAND: '/updatebrand',
    },
};
