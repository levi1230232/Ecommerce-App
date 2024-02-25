import db from "../models/db.js";

export const createCategory = async (req, res) => {
    try{
        const {name} = req.body;

        console.log(name);
        if (!name) {
            return res.status(400).json({ error: "Category name is required" });
        }
        const existingCategory = await db.query("SELECT * FROM categories WHERE name = $1", [name]);    
        if(existingCategory.rows.length > 0){
            return res.status(400).json({error: "Category already exists"});
        }
        const newCategory = await db.query("INSERT INTO categories (name) VALUES ($1)", [name]);
        
        return res.status(201).json({message: "Category created successfully", category: newCategory.rows[0] });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error creating category:", error);
        res.status(500).json({ error: "An error occurred while creating category" });
    }
}   

// Cập nhật một danh mục
export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const {name}  = req.body;

        // Cập nhật thông tin danh mục trong cơ sở dữ liệu
        const updatedCategory = await db.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [name, categoryId]);

        // Trả về thông tin danh mục đã được cập nhật thành công
        res.status(200).json({ message: "Category updated successfully", category: updatedCategory.rows[0] });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error updating category:", error);
        res.status(500).json({ error: "An error occurred while updating category" });
    }
};

// Xóa một danh mục
export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Xóa danh mục khỏi cơ sở dữ liệu
        await db.query('DELETE FROM categories WHERE id = $1', [categoryId]);

        // Trả về thông báo xóa thành công
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "An error occurred while deleting category" });
    }
};



// Lấy tất cả các danh mục
export const getAllCategories = async (req, res) => {
    try {
        // Thực hiện truy vấn để lấy tất cả các danh mục từ cơ sở dữ liệu
        const categories = await db.query("SELECT * FROM categories");

        // Trả về danh sách các danh mục
        res.status(200).json({ categories: categories.rows });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error getting all categories:", error);
        res.status(500).json({ error: "An error occurred while getting all categories" });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Thực hiện truy vấn để lấy thông tin của danh mục dựa trên ID
        const category = await db.query("SELECT * FROM categories WHERE id = $1", [categoryId]);

        // Kiểm tra xem danh mục có tồn tại không
        if (category.rows.length === 0) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Trả về thông tin của danh mục
        res.status(200).json({ category: category.rows[0] });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error getting category by ID:", error);
        res.status(500).json({ error: "An error occurred while getting category by ID" });
    }
};