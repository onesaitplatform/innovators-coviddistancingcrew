package com.minsait.onesait.platform.innovators.cdc.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.minsait.onesait.platform.innovators.cdc.alert.model.CDCAlarm;
import com.minsait.onesait.platform.innovators.cdc.alert.model.Status;
import com.minsait.onesait.platform.innovators.cdc.alert.repository.CDCAlarmRepository;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class StationStatusRestImpl implements StationStatusRest {

	@Autowired
	CDCAlarmRepository alarmRepository;

	@Override
	public ResponseEntity<Map<String, String>> getStationStatus() {
		List<Status> alerts = alarmRepository.getStatusAlert(CDCAlarm.Severity.HIGH.name());
		List<Status> warnings = alarmRepository.getStatusAlert(CDCAlarm.Severity.MEDIUM.name());
		List<Status> goods = alarmRepository.getStatusAlert(CDCAlarm.Severity.LOW.name());
		Map<String, String> stationStatus = new HashMap<>();

		for (Status alert : alerts) {
			stationStatus.put(alert.getStationId(), "ALERT");
		}
		for (Status warning : warnings) {
			stationStatus.put(warning.getStationId(), "WARNING");
		}
		for (Status good : goods) {
			stationStatus.put(good.getStationId(), "GOOD");
		}

		return new ResponseEntity<>(stationStatus, HttpStatus.OK);
	}

}
