package kh.edu.paragoniu.booksystemmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.edu.paragoniu.booksystemmanagement.entity.Category;
import kh.edu.paragoniu.booksystemmanagement.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // CRUD operations for Category
    // 1. Add Category
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // 2. Get All Categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // 3. Get Category by ID
    public Optional<Category> getCategoryById(Integer categoryId) {
        return categoryRepository.findById(categoryId);
    }

    // 4. Update Category
    public Category updateCategory(Integer categoryId, Category categoryDetails) {
        Optional<Category> existingCategory = categoryRepository.findById(categoryId);
        if (existingCategory.isPresent()) {
            Category category = existingCategory.get();
            category.setCategoryName(categoryDetails.getCategoryName());
            category.setDescription(categoryDetails.getDescription());
            return categoryRepository.save(category);
        }
        return null;
    }

    // 5. Delete Category
    public boolean deleteCategory(Integer categoryId) {
        if (categoryRepository.existsById(categoryId)) {
            categoryRepository.deleteById(categoryId);
            return true;
        }
        return false;
    }
}
