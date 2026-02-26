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

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Integer categoryId) {
        return categoryRepository.findById(categoryId);
    }

    public Category updateCategory(Integer categoryId, Category categoryDetails) {
        Optional<Category> existingCategory = categoryRepository.findById(categoryId);
        if (existingCategory.isPresent()) {
            Category category = existingCategory.get();
            if (categoryDetails.getCategoryName() != null) {
                category.setCategoryName(categoryDetails.getCategoryName());
            }
            if (categoryDetails.getDescription() != null) {
                category.setDescription(categoryDetails.getDescription());
            }
            return categoryRepository.save(category);
        }
        return null;
    }

    public boolean deleteCategory(Integer categoryId) {
        if (categoryRepository.existsById(categoryId)) {
            categoryRepository.deleteById(categoryId);
            return true;
        }
        return false;
    }
}
