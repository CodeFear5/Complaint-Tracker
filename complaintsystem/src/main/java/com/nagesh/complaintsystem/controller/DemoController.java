package com.nagesh.complaintsystem.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DemoController {
	
	
	
	@GetMapping("/")
	@ResponseBody
	public String displayMessage() {
		
		return "hello world";
	}
	

}
