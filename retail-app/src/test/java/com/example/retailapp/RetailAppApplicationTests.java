package com.example.retailapp;

import com.example.retailapp.entity.Order;
import com.example.retailapp.entity.Product;
import com.example.retailapp.entity.User;
import com.example.retailapp.service.OrderService;
import com.example.retailapp.service.ProductService;
import com.example.retailapp.service.UserInfoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.parameters.P;

import java.util.Collection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RetailAppApplicationTests {

	@Autowired
	private OrderService orderService;

	@Autowired
	private ProductService productService;

	@Autowired
	private UserInfoService userInfoService;


	@Test
	void saveAndDeleteUser() {
		User user = new User();
		//user only expected to provide username and password
		user.setUsername("unit_test_save_01");
		user.setPassword("unit_test_save_01");
		User userReturned = userInfoService.saveClient(user);
		assertNotNull(userReturned);

		userInfoService.deleteUserByUsername("unit_test_save_01");

		try {
			userReturned = userInfoService.findByUsername(user.getUsername());
			fail();
		} catch(RuntimeException e){

		}
	}

	@Test
	void getAllOrders() {
		assertNotNull(orderService.getAllOrders());
		assertNotEquals(orderService.getAllOrders(), 0);
	}

	@Test
	void testGetOrdersFromUser(){
		User userReturned = null;
		try {
			userReturned = userInfoService.findByUsername("dev");
			Collection<Order> orders = userReturned.getOrders();
			assertNotNull(orders);
			assertNotEquals(orders.size(),0);
		} catch(RuntimeException e){
			fail();
		}
	}

	@Test
	void testGetOrderById(){
		try {
			Order order = orderService.findById(18L);
			assertNotNull(order);
		} catch(RuntimeException e){
			fail();
		}
	}

	@Test
	void testGetIncorrectOrderById(){
		try {
			Order order = orderService.findById(0L);
			fail();
		} catch(RuntimeException e){

		}
	}

	@Test
	void testUpdateStatus(){
		try{
			Order order = orderService.findById(18L);
			String olderStatus = order.getStatus();
			orderService.updateStatus(order, "Completed");
			Order updatedOrder = orderService.findById(18L);
			assertNotNull(updatedOrder);
			assertTrue(updatedOrder.getStatus().equals("Completed"));
			orderService.updateStatus(order, olderStatus);
			Order updatedOrder2 = orderService.findById(18L);
			assertTrue(updatedOrder2.getStatus().equals(olderStatus));
		} catch(Exception e){
			fail();
		}
	}

	@Test
	void testGetProductIncreaseAndDecreaseStock(){
		try {
			Product product = productService.findById(1L);
			assertNotNull(product);
			int oldStock = product.getStock();
			int amount = 5;
			productService.increaseStock(product,amount);
			Product increasedProduct = productService.findById(1L);
			assertEquals(increasedProduct.getStock(),oldStock + amount);
			//decrease
			productService.decreaseStock(increasedProduct, amount);
			Product decreasedProduct = productService.findById(1L);
			assertEquals(increasedProduct.getStock(),oldStock);

		} catch(RuntimeException e){
			fail();
		}
	}

	@Test
	void testUpdateName(){
		try {
			Product product = productService.findById(1L);
			String originalName = product.getName();
			productService.updateName(product, "test");
			Product updatedProduct = productService.findById(1L);
			assertTrue(updatedProduct.getName().equals("test"));
			productService.updateName(updatedProduct, originalName);
			Product updatedProduct2 = productService.findById(1L);
			assertTrue(updatedProduct2.getName().equals(originalName));
		} catch(RuntimeException e){
			fail();
		}
	}

	@Test
	void testUpdateCategory(){
		try {
			Product product = productService.findById(1L);
			String originalName = product.getCategory();
			productService.updateCategory(product, "test");
			Product updatedProduct = productService.findById(1L);
			assertTrue(updatedProduct.getCategory().equals("test"));
			productService.updateCategory(updatedProduct, originalName);
			Product updatedProduct2 = productService.findById(1L);
			assertTrue(updatedProduct2.getCategory().equals(originalName));
		} catch(RuntimeException e){
			fail();
		}
	}

}
