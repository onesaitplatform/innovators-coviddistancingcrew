package com.minsait.onesait.platform.innovators.cdc.platform.repository;

import java.util.List;

import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerParam;
import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerQuery;
import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerRepository;
import com.minsait.onesait.platform.innovators.cdc.platform.model.CDCPlatform;

@IoTBrokerRepository("CDC_Metro_Platforms")
public interface CDCPlatformRepository {

	@IoTBrokerQuery("SELECT c.properties.sta_name as stationName, c.properties.sta_id as stationId, c.properties.sta_lines as stationLines,c.properties.OBJECTID as elevatorId "
			+ "FROM CDC_Metro_Platforms AS c where c.properties.sta_id=$stationId")
	List<CDCPlatform> getPlatformsByStationId(@IoTBrokerParam("$stationId") String stationId);

}
