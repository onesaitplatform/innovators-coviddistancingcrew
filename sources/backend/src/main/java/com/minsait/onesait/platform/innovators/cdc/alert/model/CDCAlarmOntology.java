package com.minsait.onesait.platform.innovators.cdc.alert.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.minsait.onesait.platform.client.springboot.fromjson.ContextData;

import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class CDCAlarmOntology {

	@JsonProperty("CDC_alarm")
	private CDCAlarm alarm;

	@JsonIgnore
	private ContextData contextData;

	private JsonNode _id;

}
