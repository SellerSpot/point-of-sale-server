import Joi from 'joi';

// joi schema options
export const joiSchemaOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
};

// response status codes
export const responseStatusCodes = {
    // validation errors in the request
    BADREQUEST: 400,
    // requested resource has been createe successfully
    CREATED: 201,
    // a duplicate of the data to be created already exists in database
    CONFLICT: 409,
    // unknown server errors
    INTERNALSERVERERROR: 500,
    // operation successfully completed
    OK: 200,
    // for denoting that the required resource has not been found in database
    NOTFOUND: 404,
    // for denoting that no content is being sent in the response
    NOCONTENT: 204,
};

// fieldName constants
export enum inputFieldNames {
    // common to indicate fieldNameLess errors
    COMMONMESSAGE = 'commonMessage',
    // addbrands fields
    ADDBRANDFIELD = 'brandName',
    // category fields
    ADDCATEGORYFIELD = 'categoryName',
    // stockunit fields
    ADDSTOCKUNITFIELD = 'stockUnitName',
    // taxbracket fields
    ADDTAXBRACKETNAMEFIELD = 'addTaxBracketName',
    ADDTAXBRACKETPERCENTFIELD = 'addTaxBracketPercent',
    // product fields
    ADDPRODUCTNAMEFIELD = 'addProductName',
    ADDPRODUCTCATEGORYFIELD = 'addProductCategory',
    ADDPRODUCTBRANDFIELD = 'addProductBrand',
    ADDPRODUCTGTINFIELD = 'addProductGtin',
    ADDPRODUCTMRPFIELD = 'addProductMrp',
    ADDPRODUCTLANDINGPRICEFIELD = 'addProductLandingPrice',
    ADDPRODUCTSELLINGPRICEFIELD = 'addProductSellingPrice',
    ADDPRODUCTAVAILABLESTOCKFIELD = 'addProductAvailableStock',
}

// common joi schemas
export const commonJoiSchemas = {
    MONGODBID: Joi.string().alphanum().length(24),
};
