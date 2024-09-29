@EnableKafka
@Configuration
@RequiredArgsConstructor
public class KafkaConsumerConfig {
	private final KafkaConstants kafkaConstants;

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, KafkaDMRequest> kafkaListenerContainerFactoryDM() {
		ConcurrentKafkaListenerContainerFactory<String, KafkaDMRequest> factory = createKafkaListenerContainerFactory("dm-group");
		factory.getContainerProperties().setPollTimeout(100);
		factory.setBatchListener(false);
		factory.getContainerProperties().setIdleBetweenPolls(0);
		return factory;
	}

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, KafkaDMRequest> kafkaListenerContainerFactoryGroupChat() {
		ConcurrentKafkaListenerContainerFactory<String, KafkaDMRequest> factory = createKafkaListenerContainerFactory("group-chat-group");
		factory.setBatchListener(true);
		factory.getContainerProperties().setPollTimeout(5000);
		factory.setBatchErrorHandler(new SeekToCurrentBatchErrorHandler());
		return factory;
	}

	private ConcurrentKafkaListenerContainerFactory<String, KafkaDMRequest> createKafkaListenerContainerFactory(String groupId) {
		ConcurrentKafkaListenerContainerFactory<String, KafkaDMRequest> factory = new ConcurrentKafkaListenerContainerFactory<>();
		factory.setConsumerFactory(consumerFactory(groupId));
		return factory;
	}

	private ConsumerFactory<String, KafkaDMRequest> consumerFactory(String groupId) {
		Map<String, Object> consumerProps = new HashMap<>();
		consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaConstants.KAFKA_BROKER);
		consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
		consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
		consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class.getName());
		consumerProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest");
		consumerProps.put(JsonDeserializer.TRUSTED_PACKAGES, "*");

		// 배치 튜닝
		if (groupId.equals("dm-group")) {
			consumerProps.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 10);
			consumerProps.put(ConsumerConfig.FETCH_MIN_BYTES_CONFIG, 1);
		} else {
			consumerProps.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 500);
			consumerProps.put(ConsumerConfig.FETCH_MIN_BYTES_CONFIG, 1024 * 1024);
			consumerProps.put(ConsumerConfig.FETCH_MAX_WAIT_MS_CONFIG, 500);
		}

		return new DefaultKafkaConsumerFactory<>(consumerProps);
	}
}