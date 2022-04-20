const slugify  = require("slugify");
const categoryModel = require("../models/categories.model");


function createCategories(categories, parentId = null){
    const categoryList=[];
    let category;
    if (parentId==null){
        category = categories.filter(cat => cat.parentId == undefined)
    } else{
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for(let cat of category){
        categoryList.push({
            _id:cat._id,
            name:cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children:createCategories(categories, cat._id)
        })

    }
    return categoryList;
}

const Addcategory = async (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if (req.body.parentId){
        categoryObj.parentId = req.body.parentId
    }

    const category = new categoryModel(categoryObj)
    category.save((error, category) => {
        if (error) return res.status(404).json({error});
        if (category) {
            res.status(201).json({category});
        }

    }
    )
}

const Getcategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        const categoryList = createCategories(categories)
        res.status(201).json(categoryList);
      } catch (error) {
        console.log(error.message);
      }
    
}

const Deletecategory = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await categoryModel.findOneAndDelete({
      _id: ids[i]._id,
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};


const Updatecategory = async (req, res) => {
    const { _id, name, parentId } = req.body;
    const updatedCategories = [];
    if (name instanceof Array) {
      for (let i = 0; i < name.length; i++) {
        const category = {
          name: name[i],
        };
        if (parentId[i] !== "") {
          category.parentId = parentId[i];
        }
  
        const updatedCategory = await categoryModel.findOneAndUpdate(
          { _id: _id[i] },
          category,
          { new: true }
        );
        updatedCategories.push(updatedCategory);
      }
      return res.status(201).json({ updateCategories: updatedCategories });
    } else {
      const category = {
        name,
      };
      if (parentId !== "") {
        category.parentId = parentId;
      }
      const updatedCategory = await categoryModel.findOneAndUpdate({ _id }, category, {
        new: true,
      });
      
      return res.status(201).json({ updatedCategory });
    }


}


module.exports = {
    Getcategories,
    Deletecategory,
    Addcategory,
    Updatecategory
  };
  