import {promises as fs} from "fs"

export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }
    static id = 0

    addProduct = async (title, description, price, imagen, code, stock) => {
      
        ProductManager.id++

       let newProduct = {
        title,
        description,
        price,
        imagen, 
        code,
        stock,
        id: ProductManager.id,
        }
       
        this.products.push(newProduct)
       
       await fs.writeFile (this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta =  await fs.readFile(this.patch,"utf-8")
        return JSON.parse(respuesta)
      }

    
    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        if(!respuesta3.find(product => product.id === id)){
            console.log("Producto no Encontrado")
        }   
        else {
            console.log(respuesta3.find(product => product.id === id))
        }

    };

deleteProductById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter(products => products.id != id)
    await fs.writeFile (this.patch, JSON.stringify(productFilter));
    console.log("Producto Eliminado")    
 };

 updateProducts = async ({id, ...producto}) => {
    await this.deleteProductsbyId(id);
    let productOld = await this.readProducts()
    let productsModif = [{ ...producto, id }, ...productOld];
    await fs.writeFile (this.patch, JSON.stringify(productsModif));
 };


}

//const productos = new ProductManager()

/*productos.addProduct("Bersa TPR9", "Bersa Calibre 9mm", 1400, "ImagenURL", "BerTPR9", 10)
productos.addProduct("Bersa TPR9X", "Bersa Calibre 9mm", 1500, "ImagenURL", "BerTPR9X", 9)
productos.addProduct("Bersa TPR9 Compact", "Bersa Calibre 9mm", 1600, "ImagenURL", "BerTPR9Comp", 11)
productos.addProduct("Bersa TPR40", "Bersa Calibre 40mm", 1700, "ImagenURL", "BerTPR40", 12)
productos.addProduct("Bersa TPR40X", "Bersa Calibre 40mm", 1450, "ImagenURL", "BerTP40X", 8)
productos.addProduct("Bersa TPR40 Compact", "Bersa Calibre 40mm", 1780, "ImagenURL", "BerTPR40Comp", 7)
productos.addProduct("Bersa Combat 380", "Bersa Calibre 40mm", 1200, "ImagenURL", "BerComb380", 8)
productos.addProduct("Bersa Combat 380 CombatPlus", "Bersa Calibre 9mm", 1300, "ImagenURL", "BerComb380CP", 6)
productos.addProduct("Bersa Combat 380 Compact", "Bersa Calibre 9mm", 1400, "ImagenURL", "BerComb380Comp", 4)*/

/*productos.updateProducts({
        title: 'Bersa TPR9',
        description:'Bersa Calibre 9mm',
        price: 1400,
        imagen:'ImagenUrl', 
        code: 'BerTPR9',
        stock:"6",
        id: 1,
})*/