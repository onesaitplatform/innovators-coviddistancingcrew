package com.minsait.onesait.platform.innovators.cdc.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.minsait.onesait.platform.client.springboot.fromjson.ContextData;

import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class CDCUserTimeserieOntology {

	@JsonProperty("TimeSerie")
	private TimeSerie timeserie;

	@JsonIgnore
	private ContextData contextData;
	@JsonIgnore
	private JsonNode _id;

}
