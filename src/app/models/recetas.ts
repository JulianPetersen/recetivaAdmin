export interface Recetas {
    _id?:string,
    title:string,
    arrayIngredientes:string,
    img?:string,
    instrucciones:string,
    nutricionista?:string,
    
}


export interface recetaResponse {
    _id?:string,
    title:string,
    arrayIngredientes:string[],
    img?:string,
    instrucciones:string
    
}
