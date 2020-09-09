package com.minsait.onesait.platform.innovators.cdc.action.listener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minsait.onesait.platform.digitaltwin.action.execute.ActionJavaListener;
import com.minsait.onesait.platform.innovators.cdc.websocket.WebsocketAdapter;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class ActionListener implements ActionJavaListener {

	@Autowired
	private WebsocketAdapter websocketAdapterImpl;

	private ObjectMapper mapper = new ObjectMapper();

	@Override
	public void executeAction(String actionName, String data) {
		log.info("New action arrive: " + actionName);
		if (actionName.equals("alert")) {
			this.sendAlert(data);
		}
	}

	private void sendAlert(String data) {
		try {
			websocketAdapterImpl.webSocketPublisher("/out/alert", mapper.writeValueAsString(data));
		} catch (Exception e) {
			log.error("Error publishing by websocket, {}", e);
		}
	}

}
