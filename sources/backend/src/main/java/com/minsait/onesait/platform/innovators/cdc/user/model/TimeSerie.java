package com.minsait.onesait.platform.innovators.cdc.user.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.minsait.onesait.platform.client.springboot.fromjson.TimeStamp;

import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class TimeSerie {

	private TimeStamp timestamp;

	private Integer users;

	private String station;

}
