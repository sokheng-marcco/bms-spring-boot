package kh.edu.paragoniu.booksystemmanagement.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kh.edu.paragoniu.booksystemmanagement.entity.Author;
import kh.edu.paragoniu.booksystemmanagement.service.AuthorService;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @PostMapping
    public ResponseEntity<Author> createAuthor(@RequestBody Author author) {
        Author createdAuthor = authorService.createAuthor(author);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAuthor);
    }

    @GetMapping
    public ResponseEntity<List<Author>> getAllAuthors() {
        List<Author> authors = authorService.getAllAuthors();
        return ResponseEntity.ok(authors);
    }

    @GetMapping("/{authorId}")
    public ResponseEntity<Author> getAuthorById(@PathVariable Integer authorId) {
        Optional<Author> author = authorService.getAuthorById(authorId);
        if (author.isPresent()) {
            return ResponseEntity.ok(author.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{authorId}")
    public ResponseEntity<Author> updateAuthor(@PathVariable Integer authorId, @RequestBody Author authorDetails) {
        Author updatedAuthor = authorService.updateAuthor(authorId, authorDetails);
        if (updatedAuthor != null) {
            return ResponseEntity.ok(updatedAuthor);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{authorId}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable Integer authorId) {
        boolean deleted = authorService.deleteAuthor(authorId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
