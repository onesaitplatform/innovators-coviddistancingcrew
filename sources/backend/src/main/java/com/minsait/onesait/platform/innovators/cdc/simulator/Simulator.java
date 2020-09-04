package com.minsait.onesait.platform.innovators.cdc.simulator;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.TimeZone;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.minsait.onesait.platform.client.springboot.fromjson.TimeStamp;
import com.minsait.onesait.platform.innovators.cdc.alert.model.CDCAlarm;
import com.minsait.onesait.platform.innovators.cdc.alert.model.CDCAlarm.AlarmType;
import com.minsait.onesait.platform.innovators.cdc.alert.model.CDCAlarm.Severity;
import com.minsait.onesait.platform.innovators.cdc.alert.model.CDCAlarm.Source;
import com.minsait.onesait.platform.innovators.cdc.alert.model.CDCAlarm.Status;
import com.minsait.onesait.platform.innovators.cdc.alert.model.CDCAlarmOntology;
import com.minsait.onesait.platform.innovators.cdc.alert.repository.CDCAlarmRepository;
import com.minsait.onesait.platform.innovators.cdc.elevator.model.CDCElevator;
import com.minsait.onesait.platform.innovators.cdc.elevator.repository.CDCElevatorRepository;
import com.minsait.onesait.platform.innovators.cdc.platform.model.CDCPlatform;
import com.minsait.onesait.platform.innovators.cdc.platform.repository.CDCPlatformRepository;
import com.minsait.onesait.platform.innovators.cdc.station.model.CDCStation;
import com.minsait.onesait.platform.innovators.cdc.station.repository.CDCStationRepository;
import com.minsait.onesait.platform.innovators.cdc.user.model.CDCUserTimeserieOntology;
import com.minsait.onesait.platform.innovators.cdc.user.model.TimeSerie;
import com.minsait.onesait.platform.innovators.cdc.user.repository.CDCUsersRepository;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class Simulator {

	private static final String FORMAT = "YYYY-MM-dd'T'HH:mm:ss'Z'";

	@Autowired
	CDCAlarmRepository alarmRepository;

	@Autowired
	CDCStationRepository stationRepository;

	@Autowired
	CDCUsersRepository userRepository;

	@Autowired
	CDCElevatorRepository elevatorRepository;

	@Autowired
	CDCPlatformRepository platformRepository;

	private List<CDCStation> stations = new ArrayList<>();
	private Random rand = new Random();

	@PostConstruct
	public void init() {
		Timer timer = new Timer();
		stations = stationRepository.getAllStation();
		timer.schedule(new InsertAlarm(), 0, 600000);
	}

	class InsertAlarm extends TimerTask {
		public void run() {
			CDCAlarmOntology ontology = new CDCAlarmOntology();
			CDCAlarm alarm = new CDCAlarm();

			AlarmType type = AlarmType.randomAlarmType();

			Calendar calendar = Calendar.getInstance();
			Date date = calendar.getTime();
			SimpleDateFormat sdf = new SimpleDateFormat(FORMAT);
			sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
			String datetime = sdf.format(date);

			TimeStamp timestamp = new TimeStamp();
			timestamp.set$date(datetime);

			CDCStation randomStation = stations.get(rand.nextInt(stations.size()));
			String[] lines = randomStation.getStationLines().split(",");

			Source source = Source.randomSource();
			if (source.equals(Source.ELEVATOR)) {
				List<CDCElevator> elevators = elevatorRepository.getElevatorByStationId(randomStation.getStationId());
				if (elevators != null && !elevators.isEmpty()) {
					alarm.setSource(source);
					alarm.setSourceId(elevators.get(rand.nextInt(elevators.size())).getElevatorId());
				}
			} else {
				if (source.equals(Source.PLATFORM)) {
					List<CDCPlatform> platforms = platformRepository
							.getPlatformsByStationId(randomStation.getStationId());
					if (platforms != null && !platforms.isEmpty()) {
						alarm.setSource(source);
						alarm.setSourceId(platforms.get(rand.nextInt(platforms.size())).getPlatformId());
					}
				}
			}
			alarm.setAlarmType(type);
			alarm.setDetails(buildDetails(type));
			alarm.setId(UUID.randomUUID().toString());
			alarm.setStatus(Status.OPEN);
			alarm.setTimestamp(timestamp);
			alarm.setStationName(randomStation.getStationName());
			alarm.setStationId(randomStation.getStationId());
			alarm.setStationLine(lines[rand.nextInt(lines.length)]);
			alarm.setSource(Source.randomSource());
			alarm.setSeverity(Severity.randomSeverity());

			ontology.setAlarm(alarm);

			alarmRepository.insert(ontology);
			log.info("Alarm has been inserted");
		}
	}

	class InsertUser extends TimerTask {
		public void run() {
			CDCUserTimeserieOntology ontology = new CDCUserTimeserieOntology();
			TimeSerie timeserie = new TimeSerie();

			Calendar calendar = Calendar.getInstance();
			Date date = calendar.getTime();
			SimpleDateFormat sdf = new SimpleDateFormat(FORMAT);
			sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
			String datetime = sdf.format(date);

			TimeStamp timestamp = new TimeStamp();
			timestamp.set$date(datetime);

			CDCStation randomStation = stations.get(rand.nextInt(stations.size()));

			timeserie.setStation(randomStation.getStationName());
			timeserie.setTimestamp(timestamp);
			timeserie.setUsers(ThreadLocalRandom.current().nextInt(0, 200 + 1));

			ontology.setTimeserie(timeserie);

			userRepository.insert(ontology);
			log.info("Timeserie has been inserted");
		}
	}

	private String buildDetails(AlarmType type) {
		if (type.equals(AlarmType.CAPACITY)) {
			return "The allowed capacity has been exceeded";
		} else if (type.equals(AlarmType.LATHE)) {
			return "A lathe has been ignored by a user";
		}
		if (type.equals(AlarmType.MASK)) {
			return "A user is not wearing a mask";
		}
		if (type.equals(AlarmType.SOCIAL_DISTANCING)) {
			return "The safety distance is not being respected";
		}
		return null;
	}

}
