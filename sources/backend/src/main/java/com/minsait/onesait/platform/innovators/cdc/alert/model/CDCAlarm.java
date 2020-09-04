package com.minsait.onesait.platform.innovators.cdc.alert.model;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.minsait.onesait.platform.client.springboot.fromjson.TimeStamp;

import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class CDCAlarm {

	public enum Severity {
		HIGH, MEDIUM, LOW;

		private static final List<Severity> VALUES = Collections.unmodifiableList(Arrays.asList(values()));
		private static final int SIZE = VALUES.size();
		private static final Random RANDOM = new Random();

		public static Severity randomSeverity() {
			return VALUES.get(RANDOM.nextInt(SIZE));
		}
	}

	public enum Source {
		ELEVATOR, PLATFORM;

		private static final List<Source> VALUES = Collections.unmodifiableList(Arrays.asList(values()));
		private static final int SIZE = VALUES.size();
		private static final Random RANDOM = new Random();

		public static Source randomSource() {
			return VALUES.get(RANDOM.nextInt(SIZE));
		}
	}

	public enum AlarmType {
		SOCIAL_DISTANCING, MASK, LATHE, CAPACITY;

		private static final List<AlarmType> VALUES = Collections.unmodifiableList(Arrays.asList(values()));
		private static final int SIZE = VALUES.size();
		private static final Random RANDOM = new Random();

		public static AlarmType randomAlarmType() {
			return VALUES.get(RANDOM.nextInt(SIZE));
		}
	}

	public enum Status {
		OPEN, CLOSE;

		private static final List<Status> VALUES = Collections.unmodifiableList(Arrays.asList(values()));
		private static final int SIZE = VALUES.size();
		private static final Random RANDOM = new Random();

		public static Status randomStatus() {
			return VALUES.get(RANDOM.nextInt(SIZE));
		}
	}

	private TimeStamp timestamp;

	private String id;

	private String stationName;

	private String stationId;

	private String stationLine;

	private Severity severity;

	private AlarmType alarmType;

	private String details;

	private Status status;

	private Source source;

	private String sourceId;

}
