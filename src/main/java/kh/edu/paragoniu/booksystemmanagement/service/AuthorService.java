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

    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    public Optional<Author> getAuthorById(Integer authorId) {
        return authorRepository.findById(authorId);
    }

    public Author updateAuthor(Integer authorId, Author authorDetails) {
        Optional<Author> existingAuthor = authorRepository.findById(authorId);
        if (existingAuthor.isPresent()) {
            Author author = existingAuthor.get();
            if (authorDetails.getName() != null) {
                author.setName(authorDetails.getName());
            }
            if (authorDetails.getNationality() != null) {
                author.setNationality(authorDetails.getNationality());
            }
            return authorRepository.save(author);
        }
        return null;
    }

    public boolean deleteAuthor(Integer authorId) {
        if (authorRepository.existsById(authorId)) {
            authorRepository.deleteById(authorId);
            return true;
        }
        return false;
    }
}
