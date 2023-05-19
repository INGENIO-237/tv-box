const getCodePromo = () =>{
    const prefix = "CODE";
    return prefix + "-" + Math.round(Math.random() * 1E4);
}

module.exports = getCodePromo;