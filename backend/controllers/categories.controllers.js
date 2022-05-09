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
            color:cat.color,
            parentId: cat.parentId,
            followers:cat.followers,
            children:createCategories(categories, cat._id)
        })

    }
    return categoryList;
}

const Addcategory = async (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
        color: req.body.color
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

const Delete = async (req, res) => {
  try {
    await categoryModel.findOneAndDelete({ _id: req.params.id });
    res.status(201).json({ message: "User deleted with success!" });
  } catch (error) {
    console.log(error.message);
  }
};

const Update = async (req, res) => {
  try {
    
      const data = await categoryModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
  
  } catch (error) {
    console.log(error.message);
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

const FollowCategory = async (req, res) => {
    const { id } = req.params;
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }
    const category = await categoryModel.findById(id);
    const index = category.followers.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      category.followers.push(req.userId);
    } else {
      category.followers = category.followers.filter((id) => id !== String(req.userId));
    }
    const updatedCategory = await categoryModel.findByIdAndUpdate(id, category, { new: true });

    res.status(200).json(updatedCategory);
}

module.exports = {
    Getcategories,
    Deletecategory,
    Addcategory,
    Updatecategory, 
    Delete,
    Update,
    FollowCategory
  };
  