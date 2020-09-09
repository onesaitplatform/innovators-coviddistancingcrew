package com.minsait.onesait.platform.innovators.cdc.station.repository;

import java.util.List;

import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerQuery;
import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerRepository;
import com.minsait.onesait.platform.innovators.cdc.station.model.CDCStation;

@IoTBrokerRepository("CDC_Metro_Station")
public interface CDCStationRepository {

	@IoTBrokerQuery("SELECT c.properties.sta_name as stationName, c.properties.sta_id as stationId, c.properties.sta_lines as stationLines FROM CDC_Metro_Station AS c")
	List<CDCStation> getAllStation();

}
