package kh.edu.paragoniu.booksystemmanagement.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import kh.edu.paragoniu.booksystemmanagement.entity.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {
    
}
