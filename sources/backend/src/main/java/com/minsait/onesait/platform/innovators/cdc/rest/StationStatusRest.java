package com.minsait.onesait.platform.innovators.cdc.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RequestMapping(path = "/")
@CrossOrigin(origins = "*")
@Api(value = "Station Status", tags = { "Station Status service" }, protocols = "http")
@ApiResponses({ @ApiResponse(code = 400, message = "Bad request"),
		@ApiResponse(code = 500, message = "Internal server error"), @ApiResponse(code = 403, message = "Forbidden") })
public interface StationStatusRest {

	@ApiResponses(@ApiResponse(code = 200, message = "OK", response = String.class))
	@ApiOperation(value = "Get status of the stations", consumes = "application/json", produces = "application/json")
	@RequestMapping(value = "/status", method = RequestMethod.GET)
	public ResponseEntity<?> getStationStatus();

}
