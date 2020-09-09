package com.minsait.onesait.platform.innovators.cdc.station.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class CDCStation {

	private String stationName;
	private String stationId;
	private String stationLines;

}
