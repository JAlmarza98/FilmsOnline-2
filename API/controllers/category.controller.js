const Category = require('../models/category.model');

const getCategory = async (req, res) => {

    const [total_categories, inactive_categories, categories] = await Promise.all([
        Category.countDocuments(),
        Category.countDocuments({ status: false }),
        Category.find()
    ]);

    res.json({
        total_categories,
        inactive_categories,
        categories
    });
}

const postCategory = async (req, res) => {

    const { name } = req.body;
    const category = new Category({ name });

    await category.save()

    res.json({
        msg: 'categoria creada con exito'
    })

}

const putCategory = async (req, res) => {

    const { id } = req.params;
    const { _id, status, ...others } = req.body;

    const category = await Category.findByIdAndUpdate(id, others, { new: true });

    res.json(category);
}

const deleteCategory = async (req, res) => {

    const { id } = req.params;

    await Category.findByIdAndUpdate(id, { status: false });

    res.json({
        msg: 'Categoria bloqueada'
    });

}

const releaseCategory = async (req, res) => {

    const { id } = req.params;

    await Category.findByIdAndUpdate(id, { status: true });

    res.json({
        msg: 'Categoria desbloqueada'
    });

}


module.exports = { getCategory, postCategory, putCategory, deleteCategory, releaseCategory }