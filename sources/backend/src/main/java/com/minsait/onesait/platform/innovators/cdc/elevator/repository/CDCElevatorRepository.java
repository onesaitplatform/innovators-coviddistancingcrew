package com.minsait.onesait.platform.innovators.cdc.elevator.repository;

import java.util.List;

import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerParam;
import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerQuery;
import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerRepository;
import com.minsait.onesait.platform.innovators.cdc.elevator.model.CDCElevator;

@IoTBrokerRepository("CDC_Metro_Elevators")
public interface CDCElevatorRepository {

	@IoTBrokerQuery("SELECT c.properties.sta_name as stationName, c.properties.sta_id as stationId, c.properties.sta_lines as stationLines,c.properties.OBJECTID as elevatorId "
			+ "FROM CDC_Metro_Elevators AS c where c.properties.sta_id=$stationId")
	List<CDCElevator> getElevatorByStationId(@IoTBrokerParam("$stationId") String stationId);

}
