package kh.edu.paragoniu.booksystemmanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/books")
    public String books() {
        return "books";
    }

    @GetMapping("/authors")
    public String authors() {
        return "authors";
    }

    @GetMapping("/categories")
    public String categories() {
        return "categories";
    }

    @GetMapping("/publishers")
    public String publishers() {
        return "publishers";
    }
}
