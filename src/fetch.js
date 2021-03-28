
const API_Key = 'cef88e3f496368ee54b059100bd30343';
const endpoint = 'https://api.themoviedb.org/3/';


export const fetchSome = async (path="", param={}) => {
    const url = new URL(endpoint);
    url.pathname += path;
    url.searchParams.set('api_key', API_Key);
    Object.entries(param).forEach(([k, val]) => {if(val !== null) url.searchParams.set(k, val);});
    const req = new Request(url.toString(), { method: 'GET' });
    const response = await fetch(req);
    const data = await response.json();
    if(!response.ok) throw "Bad request";
    return data;
};

export const fetchOne = async (id) => {
    const details = await fetchSome(`movie/${id}`);
    return details;
}

export const fetchPopular = async () => {
    const list = await fetchSome('movie/popular');
    return list;
}