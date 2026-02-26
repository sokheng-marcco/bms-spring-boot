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

    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(Integer bookId) {
        return bookRepository.findById(bookId);
    }

    public Book updateBook(Integer bookId, Book bookDetails) {
        Optional<Book> existingBook = bookRepository.findById(bookId);
        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            if (bookDetails.getTitle() != null) {
                book.setTitle(bookDetails.getTitle());
            }
            if (bookDetails.getPublicationYear() != null) {
                book.setPublicationYear(bookDetails.getPublicationYear());
            }
            if (bookDetails.getCategory() != null) {
                book.setCategory(bookDetails.getCategory());
            }
            if (bookDetails.getPublisher() != null) {
                book.setPublisher(bookDetails.getPublisher());
            }
            if (bookDetails.getAuthors() != null) {
                book.setAuthors(bookDetails.getAuthors());
            }
            return bookRepository.save(book);
        }
        return null;
    }

    public boolean deleteBook(Integer bookId) {
        if (bookRepository.existsById(bookId)) {
            bookRepository.deleteById(bookId);
            return true;
        }
        return false;
    }
}
