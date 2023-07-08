import { API_STRINGS } from "../constants/strings";

const buildParams = obj => {
    const objectKeys = Object.keys(obj)
    if(!objectKeys.length){
        return ''
    }
    // creates an array with all the object params splitted
    // example: ['param1=param1Value', 'param2=param2Value']
    const splittedParams = objectKeys.map(key => {
        return `${key}=${obj[key]}`;
    })
    // here join that params with & operator
    const params = splittedParams.join('&')
    return `?${params}`
}


export const handleFetch = async (prefix, options) => {
    const {headers, body, ...defaultOptions} = options;

    const stringBody = JSON.stringify({ ...body })
    
    const optionObj = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        },
        ...(body && {body: stringBody}),
        ...defaultOptions
    }

    //const getParams = defaultOptions.method === 'GET' ? buildParams(defaultOptions) : ''
    const url = API_STRINGS.BASE_URL + prefix;
    return fetch(url, optionObj)
        .then(response => {
            return response.json();
        }).then(json => {
            return json;
        }).catch(error => {
            console.error(`Error in request: ${url} /n ${error}`)
            return error
        })
} 