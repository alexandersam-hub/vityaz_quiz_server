const CategoryModel = require('../models/CategoryModel')
class CategoryService{

    async getCategory(){
        try{
            const newCategory = await CategoryModel.find()
            return {warning:false, category:newCategory}
        }catch (e) {
            return {warning:true, message:'Ошибка БД'}
        }
    }

    async getCategoryByName(name){
        try{
            const category = await CategoryModel.findOne({name})

            return {warning:false, category}
        }catch (e) {
            return {warning:true, message:'Ошибка БД'}
        }
    }

    async addCategory(category){
        try{
            if(category.id)
                delete (category.id)
            const newCategory = await CategoryModel.create({...category})
            return {warning:false, category:newCategory}
        }catch (e) {
            return {warning:true, message:'Ошибка БД'}
        }
    }

    async delCategory(id){
        try{
            const category = CategoryModel.findByIdAndDelete(id)
            return {warning:false, category:category}
        }catch (e) {
            return {warning:true, message:'Ошибка БД'}
        }
    }

    async updateCategory( category){
        try{
            const newCategory = await CategoryModel.findOne({name:category.name})

            newCategory.img = category.img
            await newCategory.save()
            return {warning:false, category:newCategory}
        }catch (e) {
            return {warning:true, message:'Ошибка БД'}
        }
    }
}

module.exports = new CategoryService()