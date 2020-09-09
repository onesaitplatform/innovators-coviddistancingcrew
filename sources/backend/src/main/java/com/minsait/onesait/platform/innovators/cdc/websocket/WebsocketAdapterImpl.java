package com.minsait.onesait.platform.innovators.cdc.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@Component
public class WebsocketAdapterImpl implements WebsocketAdapter {

	@Autowired
	private SimpMessageSendingOperations messagingTemplate;

	@Override
	public Object webSocketPublisher(String topic, String result) {
		messagingTemplate.convertAndSend(topic, result);
		return null;
	}

}
