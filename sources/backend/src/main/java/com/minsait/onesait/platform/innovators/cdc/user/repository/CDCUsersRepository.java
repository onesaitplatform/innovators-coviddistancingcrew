package com.minsait.onesait.platform.innovators.cdc.user.repository;

import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerInsert;
import com.minsait.onesait.platform.client.springboot.aspect.IoTBrokerRepository;
import com.minsait.onesait.platform.innovators.cdc.user.model.CDCUserTimeserieOntology;

@IoTBrokerRepository("CDC_Visitantes")
public interface CDCUsersRepository {

	@IoTBrokerInsert
	String insert(CDCUserTimeserieOntology device);

}
