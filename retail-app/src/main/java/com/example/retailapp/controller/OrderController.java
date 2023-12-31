package com.example.retailapp.controller;

import com.example.retailapp.entity.Order;
import com.example.retailapp.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.coyote.Response;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    // GET method for displaying all orders
    @GetMapping("")
    public List<Order> getOrders(){
        return this.orderService.getAllOrders();
    }

    // POST method for adding an order

    @PostMapping("")
    public Order addOrder(@RequestBody Order order){
        Order dbOrder = orderService.save(order);

        return dbOrder;
    }

    // PUT method for updating order status to order found by id

    @PutMapping("/{id}/{status}")
    public Order updateStatus(@PathVariable(name = "id") Long id,
                              @PathVariable(name = "status") String status){
        log.info("Setting order id " + id + " to status " + status);
        try {
            Order dbOrder = orderService.findById(id);
            return orderService.updateStatus(dbOrder, status);
        } catch(RuntimeException e){
            log.error("Updating order status failed for id: " + id);
            return new Order();
        }
    }


    //POST /files saves a file for a user to the database

    //some help from https://www.youtube.com/watch?v=Qh3g1JD9JiM ,
    //https://stackoverflow.com/questions/44839753/returning-json-object-as-response-in-spring-boot
    // and
    //https://www.bezkoder.com/spring-boot-file-upload/
    @PostMapping("/files")
    public ResponseEntity<String> saveFile(@RequestParam("file") MultipartFile file, @RequestParam("user") String username){
        //create directory
        Path root = Paths.get("uploads");
        try {
            Files.createDirectories(root);
        } catch (IOException e){
            log.error("Directory was not able to be initialized, may already exist");
        }

        Path userPath = Paths.get("uploads/" + username);
        try {
            Files.createDirectories(userPath);
        } catch (IOException e){
            log.error("User directory was not able to be initialized, may already exist");
        }
        //file name is modified to be unique
        String modifiedFileName = System.currentTimeMillis()+"_"+file.getOriginalFilename();
        modifiedFileName = modifiedFileName.replaceAll(" ", "_");
        try {
            Files.copy(file.getInputStream(), userPath.resolve(modifiedFileName));
        } catch (Exception e){
            if(e instanceof FileAlreadyExistsException) {
                log.error("File of that name already exists, ignored");
                return ResponseEntity.internalServerError().body("File already exists");
            }

            return ResponseEntity.internalServerError().body("Error with copying the file.");
        }
        JSONObject response = new JSONObject();
        response.put("path", userPath);
        response.put("fileName", modifiedFileName);
        return ResponseEntity.ok(response.toString());
    }


    //some help from https://stackoverflow.com/questions/5673260/downloading-a-file-from-spring-controllers
    // https://www.tutorialspoint.com/spring_boot/spring_boot_file_handling.htm
    // and https://www.baeldung.com/sprint-boot-multipart-requests
    //returns the file based on user and filename
    @GetMapping("/files/{user}/{filename}")
    public ResponseEntity<Object> getFileByUser(@PathVariable("filename") String fileName,
                                      @PathVariable("user") String user) throws IOException{
        log.info("Get jpeg file by user called");
        String fullPath = "./uploads/" + user + "/" + fileName;
        log.info("File tried to be accessed is at path: " + fullPath);
        File file = new File(fullPath);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        long fileLength = file.length();
        String filetype = "";
        if(FilenameUtils.getExtension(fileName).equals("doc")){
            filetype = "application/msword";
        } else if (FilenameUtils.getExtension(fileName).equals("jpeg") || FilenameUtils.getExtension(fileName).equals("jpg")){
            filetype = "image/jpeg";
        } else if (FilenameUtils.getExtension(fileName).equals("docx")){
            filetype = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        } else {
            log.error("Incorrect file-type, can only be doc, docx, or jpg/jpeg");
            return ResponseEntity.internalServerError().body("Error with getting a file of the type provided.");
        }
        log.info("File type is : " + filetype);
        HttpHeaders respHeader = new HttpHeaders();
        respHeader.setContentType(MediaType.parseMediaType(filetype));
        respHeader.setContentLength(fileLength);
        respHeader.setContentDispositionFormData("attachment", fileName);

        ResponseEntity<Object> responseEntity = ResponseEntity.ok().headers(respHeader)
                        .contentLength(file.length()).contentType(MediaType.parseMediaType(filetype)).body(resource);
        return responseEntity;
    }

}
