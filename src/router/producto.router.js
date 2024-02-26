const router = require('express').Router();
const Producto = require('../model/producto.model');



router.get('/productos',  async(req, res)=>{
    const productos = await Producto.findAll()
    res.status(200).json({
        status:200,
        body:productos

    })
})
router.get('/productos/:id',  async(req, res)=>{
    const id = req.params.id;
    const producto = await Producto.findOne({where: {id:id}});
    res.status(200).json({
        status:200,
        body:producto

    })
})
router.post('/productos', async(req, res)=>{
    const data=req.body;
    await Producto.sync()
    const createProducto = await Producto.create({
        estado:data.estado,
        kit:data.kit,
        barcode:data.barcode,
        nombre:data.nombre,
        presentacion:data.presentacion,
        descripcion:data.descripcion,
        foto:data.foto,
        peso:data.peso
    })
    res.status(201).json({
        status:201,
        message: 'Producto creado'
        
    })
})
router.put('/productos/:id',  async(req, res)=>{
    const id = req.params.id;
    const data = req.body;
    const updateProducto = await Producto.update({
        estado:data.estado,
        kit:data.kit,
        barcode:data.barcode,
        nombre:data.nombre,
        presentacion:data.presentacion,
        descripcion:data.descripcion,
        foto:data.foto,
        peso:data.peso
    },{where: {id: id}}
    );
    res.status(200).json({
        status: 200,
        body: updateProducto,
    });
});

router.delete('/productos/:id',   async(req, res)=>{
    const id = req.params.id;
    const deleteProducto = await Producto.destroy({where: {id:id}});
    res.status(204).json({
        status:204,
        body:deleteProducto

    })
})

module.exports = router;