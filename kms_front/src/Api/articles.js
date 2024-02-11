import baseUrl from "./baseUrl";

export const getAllArticles = async (direction,department,search) => {

    let chaine = "api/v1/articles";
    if(direction && department){
        chaine += `/${direction}/${department}`;
    }
    if(search){
        chaine += `${search}`;
    }
    try{
        const res = await baseUrl.get(chaine);
        return res;
    }catch(err){
        console.log("Err ==> ",err);
    }
}

export const createArticle = async (data) => {
    console.log("from api ------------> ",data);
    // try{
        const res = await baseUrl.post("api/v1/articles",data);
        return res;
    // }catch(err){
        // console.log("Err ==> ",err);
    // }
}

export const getArticleBySLug = async (slug) => {
    try{
        const res = await baseUrl.get(`api/v1/articles/slug/${slug}`);
        return res;
    }catch(err){
        console.log("Err ==> ",err);
    }
}

export const getArticleById = async (id) => {
        const res = await baseUrl.get(`api/v1/articles/${id}`);
        return res;
}