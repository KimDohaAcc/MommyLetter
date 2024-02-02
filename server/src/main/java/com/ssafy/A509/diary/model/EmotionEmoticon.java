package com.ssafy.A509.diary.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class EmotionEmoticon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long emotionId;

	@Setter
	@ManyToOne
	@JoinColumn(name = "emoticon_id")
	private Emoticon emoticon;

	@Enumerated(EnumType.STRING)
	private Emotion emotion;

	@Builder
	public EmotionEmoticon(Emoticon emoticon, Emotion emotion) {
		this.emoticon = emoticon;
		this.emotion = emotion;
	}
}
