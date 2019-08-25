import { rateLimiter } from "../../config/redis-config"

/**
 * Set sorting parameters
 */
const setSorting = ( req, res, next ) => {
    const { sortBy } = {...req.query};

    if (sortBy) {
        let sortObj = {};
        sortBy.split('|')
            .map(param => {
                const [ field, wise ] = param.split('@').map(p => p.trim());
                return { field, wise }
            })
            .forEach(( param ) => {
                let obj = {};
                let wise = null;
                switch (param.wise) {
                    case "asc": wise = 1; break;
                    case "desc": wise = -1; break;
                    default: wise = 1; break;
                }
                obj[`${param.field}`] = wise;
                sortObj = {...sortObj, ...obj};
            })
        req.sortBy = sortObj;
    } else {
        req.sortBy = null;
    }
    return next();
}

/**
 * Set pagination parameters
 */
const parsePagination = ( req, res, next ) => {
    let from = null; 
    let size = null;
    const query_params = {...req.query};
    if (query_params.page && query_params.elementsperpage) {
        let { page, elementsperpage } = query_params;
        page = page|0;
        if (page === 0)
            page = 1
        elementsperpage = elementsperpage|0;
        size = elementsperpage;
        from = (page - 1)*size;
    }
    req.pagination = { from, size }
    return next()
}


/**
 * Parse and organize query parameters
 */
const parseQueryParams = ( req, res, next ) => {
    let query_params = {...req.query};
    /** Ignore pagination and sorting */
    delete query_params.elementsperpage;
    delete query_params.page;
    delete query_params.sortBy;

    let paramsObj = {};

    Object.keys(query_params)
        .forEach(key => {
            const value = query_params[key].split('|');
            paramsObj[key] = value[0] ? value : null;
        })

    if (paramsObj.search) paramsObj.search = paramsObj.search.join(" ").trim();

    req.paramsObj = paramsObj;
    next();
}

/** DDoS/Brute force attacks */
const bruteForceShield = async ( req, res, next ) => {
    try {
        await rateLimiter.consume(req.ip)
        return next()
    } catch (error) {
        res.status(429).json({
            error: true,
            messageCode: "TOO_MANY_REQUESTS"
        });   
    }
}

export {
    bruteForceShield,
    parsePagination,
    parseQueryParams,
    setSorting
}