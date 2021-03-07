module.exports = (temp,product) =>{
    
    let output = temp.replace(/{%TITLE%}/g, product.productName);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%GENDER%}/g, product.gender);
    output = output.replace(/{%SIZE%}/g, product.size);
    output = output.replace(/{%COLOR%}/g, product.color);
    output = output.replace(/{%PHOTO%}/g, product.photo);
    output = output.replace(/{%ID%}/g, product.id);
    
    return output;
}