package kh.edu.paragoniu.booksystemmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.edu.paragoniu.booksystemmanagement.entity.Book;
import kh.edu.paragoniu.booksystemmanagement.repository.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // CRUD operations for Book
    // 1. Add Book
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    // 2. Get All Books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // 3. Get Book by ID
    public Optional<Book> getBookById(Integer bookId) {
        return bookRepository.findById(bookId);
    }

    // 4. Update Book
    public Book updateBook(Integer bookId, Book bookDetails) {
        Optional<Book> existingBook = bookRepository.findById(bookId);
        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            book.setTitle(bookDetails.getTitle());
            book.setPublicationYear(bookDetails.getPublicationYear());
            book.setCategory(bookDetails.getCategory());
            book.setPublisher(bookDetails.getPublisher());
            book.setAuthors(bookDetails.getAuthors());
            return bookRepository.save(book);
        }
        return null;
    }

    // 5. Delete Book
    public boolean deleteBook(Integer bookId) {
        if (bookRepository.existsById(bookId)) {
            bookRepository.deleteById(bookId);
            return true;
        }
        return false;
    }
}
