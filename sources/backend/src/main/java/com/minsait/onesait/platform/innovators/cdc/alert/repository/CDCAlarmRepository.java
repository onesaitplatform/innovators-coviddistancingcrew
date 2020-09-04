package com.minsait.onesait.platform.innovators.cdc.alert.repository;

import java.util.List;

import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerDelete;
import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerInsert;
import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerParam;
import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerQuery;
import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerRepository;
import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerUpdate;
import com.minsait.onesait.platform.innovators.cdc.alert.model.CDCAlarmOntology;
import com.minsait.onesait.platform.innovators.cdc.alert.model.Status;

@IoTBrokerRepository("CDC_alarm")
public interface CDCAlarmRepository {

	@IoTBrokerQuery("select * from CDC_alarm as c")
	List<CDCAlarmOntology> getAll();

	@IoTBrokerInsert
	String insert(CDCAlarmOntology device);

	@IoTBrokerUpdate
	void update(String id, CDCAlarmOntology device);

	@IoTBrokerQuery("select * from CDC_alarm as c where c.CDC_alarm.station='$station' and c.CDC_alarm.status='OPEN'")
	CDCAlarmOntology getOpenByStation(@IoTBrokerParam("$station") String station);

	@IoTBrokerQuery("SELECT count(*) as count, c.CDC_alarm.stationId as stationId FROM CDC_alarm AS c where c.CDC_alarm.severity='$severity' and c.CDC_alarm.status='OPEN' group by c.CDC_alarm.stationId")
	List<Status> getStatusAlert(@IoTBrokerParam("$severity") String severity);

	@IoTBrokerDelete
	void delete(String id);

}
