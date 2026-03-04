package kh.edu.paragoniu.booksystemmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.edu.paragoniu.booksystemmanagement.entity.Author;
import kh.edu.paragoniu.booksystemmanagement.repository.AuthorRepository;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    // CRUD operations for Author
    // 1. Add Author
    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    // 2. Get All Authors
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    // 3. Get Author by ID
    public Optional<Author> getAuthorById(Integer authorId) {
        return authorRepository.findById(authorId);
    }

    // 4. Update Author
    public Author updateAuthor(Integer authorId, Author authorDetails) {
        Optional<Author> existingAuthor = authorRepository.findById(authorId);
        if (existingAuthor.isPresent()) {
            Author author = existingAuthor.get();
            author.setName(authorDetails.getName());
            author.setNationality(authorDetails.getNationality());
            return authorRepository.save(author);
        }
        return null;
    }

    // 5. Delete Author
    public boolean deleteAuthor(Integer authorId) {
        if (authorRepository.existsById(authorId)) {
            authorRepository.deleteById(authorId);
            return true;
        }
        return false;
    }
}
